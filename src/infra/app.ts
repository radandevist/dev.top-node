import express, { json, urlencoded } from "express";

import { apiBasePath } from "../config/app";
import { configuredCors } from "../middlewares/configuredCors";
import { configuredMorgan } from "../middlewares/configuredMorgan";

import { apiRouter } from "./routes";

export const app = express();

app.use(configuredMorgan());
app.use(configuredCors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(apiBasePath, apiRouter);
