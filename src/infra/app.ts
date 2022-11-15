import express, { json, urlencoded } from "express";
import morgan from "morgan";

import { apiBasePath } from "../config/app";
import { stream } from "../helpers/logger";

import { apiRouter } from "./routes";

export const app = express();

app.use(morgan("combined", { stream }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(apiBasePath, apiRouter);
