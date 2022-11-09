import "reflect-metadata"
import "../dotenv"
import express from "express"
import { initializeDataSource } from "./dataSource"

initializeDataSource();

const app = express()
const port = 3300

app.use("/api", function (req, res) {
  res.send({ message: "welcome to our api" })
})

app.listen(port, function () {
  console.log("App is running on port " + port)
})
