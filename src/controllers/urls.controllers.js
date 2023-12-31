import { nanoid } from 'nanoid';
import { db } from "../database/database.connection.js"

export async function createUrl(req, res) {
    const { url } = req.body
    const authorization = req.headers["authorization"]

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace("Bearer ", "")

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

    if (authorization != session.rows[0].token) {
        return res.sendStatus(401)
    }

    if (!session.rows.length) {
        return res.sendStatus(401)
    }    

    const shortUrl = nanoid(8);

    try {

    const response = await db.query(`INSERT INTO urls (url, "userId", shorturl) VALUES ($1, $2, $3) RETURNING *`, [url, session.rows[0].user_id, shortUrl])

    const urluser = await db.query(`INSERT INTO "userUrls" ("urlId", "userId") VALUES ($1, $2) RETURNING *`, [response.rows[0].id, response.rows[0].userId])

    console.log(urluser.rows[0])

    res.status(201).send({ id: response.rows[0].id, shortUrl })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getUrlById(req, res) {
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
        res.status(500).send(error.message)
    }
}

export async function OpenShortUrl(req, res) {
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
        res.status(500).send(error.message)
    }
}

export async function getUrlByUserId(req, res) {
    const authorization = req.headers["authorization"]

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace("Bearer ", "")

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [token])

    if (authorization != session.rows[0].token) {
        return res.sendStatus(401)
    }

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

    } catch (error) {res.status(500).send(error.message)}
}

export async function getRanking(req, res) {
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

        } catch (error) {res.status(500).send(error.message)}
}

export async function deleteUrl(req, res) {
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

    if (urlExists.rows.length === 0) {
        return res.sendStatus(404)
    }


    await db.query(`
    DELETE FROM urls
        WHERE urls.id = $1`, [id])

    res.sendStatus(204)

    } catch (error) {res.status(500).send(error.message)}
}




