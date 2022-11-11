
import express from "express"

const app = express()

app.use("/api", function (req, res) {
  res.send({ message: "welcome to our api" })
})

export { app };