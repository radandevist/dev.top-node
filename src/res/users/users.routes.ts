import { Router } from "express"
import { createUser } from "./users.controller"

const router = Router()

router.post('/', createUser)

export { router }