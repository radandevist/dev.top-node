import express, { json, urlencoded } from "express";
import { serve, setup } from "swagger-ui-express";
import cookieParser from "cookie-parser";

import { apiBasePath } from "../config/app";
import { swaggerDocument } from "../config/swagger";
import { configuredCors } from "../middlewares/configuredCors";
import { configuredMorgan } from "../middlewares/configuredMorgan";
import { errorLogger, errorResponder } from "../middlewares/errorMiddlewares";

import { apiRouter } from "./routes";

export const app = express();

// regular middlewares
// defined before routes setup
app.use(configuredMorgan());
app.use(configuredCors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes handlers setup
app.use("/api-docs", serve, setup(swaggerDocument));
app.use(apiBasePath, apiRouter);

// error middlewares
// defined after routes setup
app.use(errorLogger);
app.use(errorResponder);
