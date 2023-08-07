import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Joi from "joi"
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import pg from "pg"
import { nanoid } from 'nanoid';

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const { Pool } = pg

const configDatabase = {
  connectionString: process.env.DATABASE_URL
}

if (process.env.NODE_ENV === "production") configDatabase.ssl = true

export const db = new Pool(configDatabase)

app.post("/signup", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.ref("password")
    })

    const validation = schema.validate({ name, email, password, confirmPassword })

    if (validation.error) {
        return res.sendStatus(400)
    }

    const emailExists = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (emailExists.rows.length) {
        return res.sendStatus(409)
    }

    const hash = bcrypt.hashSync(password, 10)

    await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hash])

    res.sendStatus(201)
})

app.post("/signin", async (req, res) => {
    const { email, password } = req.body
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    const validation = schema.validate({ email, password })

    if (validation.error) {
        return res.sendStatus(400)
    }

    const user = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (!user.rows.length || !bcrypt.compareSync(password, user.rows[0].password)) {
        return res.sendStatus(401)
    }

    const token = uuid()

    await db.query("INSERT INTO sessions (user_id, token) VALUES ($1, $2)", [user.rows[0].id, token])

    res.send({ token })

})

app.post("/urls/shorten", async (req, res) => {
    const { url } = req.body
    const authorization = req.headers["authorization"]

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace("Bearer ", "")

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

    console.log(session.rows[0].user_id)

    if (!session.rows.length) {
        return res.sendStatus(401)
    }

    const schema = Joi.object({
        url: Joi.string().uri().required()
    })

    const validation = schema.validate({ url })

    if (validation.error) {
        return res.sendStatus(400)
    }

    const shortUrl = nanoid(8);

    console.log(shortUrl)

    try {

    const response = await db.query(`INSERT INTO urls (url, "userId", shorturl) VALUES ($1, $2, $3) RETURNING *`, [url, session.rows[0].user_id, shortUrl])

    const urluser = await db.query(`INSERT INTO "userUrls" ("urlId", "userId") VALUES ($1, $2) RETURNING *`, [response.rows[0].id, response.rows[0].userId])

    console.log(urluser.rows[0])

    res.send({ id: response.rows[0].id, shortUrl })

    } catch (error) {
        console.log(error)
    }
})

app.get("/urls/:id", async (req, res) => {
    const { id } = req.params
    
    try {

    const url = await db.query(`
    SELECT urls.id, urls.shorturl, urls.url FROM urls
	    WHERE urls.id = $1`, [id])

    if (!url.rows.length) {
        return res.sendStatus(404)
    }

    res.status(200).send(url.rows[0])

    } catch (error) {
        console.log(error)
    }
})

app.get("/urls/open/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params

    try {

    const url = await db.query(`
    SELECT urls.url FROM urls
        WHERE urls.shorturl = $1`, [shortUrl])

    if (!url.rows.length) {
        return res.sendStatus(404)
    }

    await db.query(`
    UPDATE urls SET "visitCount" = "visitCount" + 1
        WHERE urls.shorturl = $1`, [shortUrl])

    res.redirect(url.rows[0].url)

    } catch (error) {
        console.log(error)
    }
})

app.get("/urls/me", async (req, res) => {
    const authorization = req.headers["authorization"]

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace("Bearer ", "")

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

    if (!session.rows.length) {
        return res.sendStatus(401)
    }

    try {

    const userinfo = await db.query(`
    SELECT users.id, users.name FROM users  
        WHERE users.id = $1`, [session.rows[0].user_id])

    const urlUser = await db.query(`
    SELECT urls.id, urls.url, urls.shorturl, urls."visitCount" FROM urls
        JOIN "userUrls" ON urls.id = "userUrls"."urlId"
        JOIN users ON users.id = "userUrls"."userId"
        WHERE users.id = $1`, [session.rows[0].user_id])

    const somaVisitas = await db.query(`
    SELECT SUM(urls."visitCount") FROM urls
        JOIN "userUrls" ON urls.id = "userUrls"."urlId"
        JOIN users ON users.id = "userUrls"."userId"
        WHERE users.id = $1`, [session.rows[0].user_id])

    const infoMe =  {
        
            ...userinfo.rows[0],
            visitCount: somaVisitas.rows[0].sum,
            shortenedUrls: 
                urlUser.rows.map(url => {
                    return {
                        id: url.id,
                        shortUrl: url.shorturl,
                        url: url.url,
                        visitCount: url.visitCount
                    }
                })}

    res.send(infoMe)

    } catch (error) {console.log(error)}
})

app.get("/ranking", async (req, res) => {
        
        try {

        const linksCount = await db.query(`
        SELECT users.id, users.name, COUNT(urls.id) AS "linksCount" ,SUM(urls."visitCount")AS "visitCount" FROM urls
            JOIN "userUrls" ON urls.id = "userUrls"."urlId"
            JOIN users ON users.id = "userUrls"."userId"
            GROUP BY users.id
            ORDER BY SUM(urls."visitCount") DESC
            LIMIT 10`)

        const ranking = linksCount.rows.map(user => {
            return {
                ...user
            }
        })

        res.send(ranking)

        } catch (error) {console.log(error)}
})

app.delete("/urls/:id", async (req, res) => {
    const { id } = req.params
    const authorization = req.headers["authorization"]

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace("Bearer ", "")

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

    if (!session.rows.length) {

        return res.sendStatus(401)

    }

    try {

    const urlUsuario = await db.query(`
    SELECT urls.id FROM urls
        JOIN "userUrls" ON urls.id = "userUrls"."urlId"
        JOIN users ON users.id = "userUrls"."userId"
        WHERE users.id = $1 AND urls.id = $2`, [session.rows[0].user_id, id])

    if (!urlUsuario.rows.length) {
        return res.sendStatus(401)
    }

    const urlExists = await db.query(`
    SELECT urls.id FROM urls
        WHERE urls.id = $1`, [id])

    if (!urlExists.rows.length) {
        return res.sendStatus(404)
    }


    await db.query(`
    DELETE FROM urls
        WHERE urls.id = $1`, [id])

    res.sendStatus(204)

    } catch (error) {console.log(error)}
})


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))