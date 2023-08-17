import "express-async-errors";
import express from "express";

import { errorHandler } from "./error/handle.error";
import routes from "./routes/router.routes";
const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;
