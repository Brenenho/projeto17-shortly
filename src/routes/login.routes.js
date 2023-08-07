import { Router } from "express"
import { signUp, signIn } from "../controllers/login.controllers.js"
import  validateSchema  from "../middlewares/validateSchema.middleware.js"
import { signupSchema } from "../schemas/signup.schema.js"
import { signinSchema } from "../schemas/signin.schema.js"

const loginRouter = Router()

loginRouter.post("/signup", validateSchema(signupSchema), signUp)
loginRouter.post("/signin", validateSchema(signinSchema), signIn)

export default loginRouter
