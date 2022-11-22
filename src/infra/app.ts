import express, { json, urlencoded } from "express";
import { serve, setup } from "swagger-ui-express";

import { apiBasePath } from "../config/app";
import { swaggerDocument } from "../config/swagger";
import { configuredCors } from "../middlewares/configuredCors";
import { configuredMorgan } from "../middlewares/configuredMorgan";

import { apiRouter } from "./routes";

export const app = express();

app.use(configuredMorgan());
app.use(configuredCors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", serve, setup(swaggerDocument));
app.use(apiBasePath, apiRouter);
