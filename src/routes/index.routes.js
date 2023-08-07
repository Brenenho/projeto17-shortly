import { Router } from "express"
import urlsRouter from "./urls.routes.js"
import loginRouter from "./login.routes.js"

const router = Router()
router.use(urlsRouter)
router.use(loginRouter)

export default router