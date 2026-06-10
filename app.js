import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import { timing } from "./middleware/timing.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(dotenv.config());
app.use(express.json());
app.use(logger);
app.use(timing);

app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
