
import express, { json, urlencoded } from "express"
import { apiRouter } from "./routes"

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api', apiRouter)

export { app };