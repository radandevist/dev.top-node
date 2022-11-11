import { Router } from "express"
import { router as usersRouter } from "../res/users/users.routes"

const apiRouter = Router()

apiRouter.use('/users', usersRouter)

export { apiRouter }