import { Router } from "express"
import { createUrl, getUrlById, OpenShortUrl, getUrlByUserId, getRanking, deleteUrl } from "../controllers/urls.controllers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { urlSchema } from "../schemas/url.schema.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), createUrl)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", OpenShortUrl)
urlsRouter.get("/users/me", getUrlByUserId)
urlsRouter.get("/ranking", getRanking)
urlsRouter.delete("/urls/:id", deleteUrl)

export default urlsRouter
