import express from "express"
import cors from "cors"
import Joi from "joi"
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import router from "./routes/index.routes.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use(router)


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})