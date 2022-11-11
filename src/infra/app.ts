import express, { json, urlencoded } from "express";

import { apiBasePath } from "../config/app";

import { apiRouter } from "./routes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(apiBasePath, apiRouter);

export { app };
