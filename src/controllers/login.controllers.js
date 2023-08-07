import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from "../database/database.connection.js"

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body

    try {
    
    const emailExists = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (emailExists.rows.length) {
        return res.sendStatus(409)
    }

    const hash = bcrypt.hashSync(password, 10)

    await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hash])

    res.sendStatus(201)
} catch (error) {
    res.status(500).send(error.message)}
}

export async function signIn(req, res) {
    const { email, password } = req.body

    const user = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (!user.rows.length || !bcrypt.compareSync(password, user.rows[0].password)) {
        return res.sendStatus(401)
    }

    const token = uuid()

    await db.query("INSERT INTO sessions (user_id, token) VALUES ($1, $2)", [user.rows[0].id, token])

    res.send({ token })
}


