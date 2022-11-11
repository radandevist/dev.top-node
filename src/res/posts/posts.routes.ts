import { Router } from 'express';

export const path = "/posts"

export const router = Router()

router.get("/", function (req, res) {
  res.send("fuck off")
})