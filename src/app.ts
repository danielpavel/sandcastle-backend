import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "./middleware/rateLimiter";
import { marketplaceAdminSign } from "./services/admin";
import bodyParser from "body-parser";
import morganMiddleware from "./middleware/morgan";
import { env } from "@/common/utils/envConfig";
import apiKeyCheck from "./middleware/apiKey";
import { StatusCodes } from "http-status-codes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(rateLimiter);
app.use(morganMiddleware);

// Routes
app.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "healthy" });
});

// Admin Sign Transaction
app.post("/api/sign-transaction", async (req, res, next) => {
  // Check API key
  apiKeyCheck(req, res, next);
  marketplaceAdminSign(req, res);
});

export default app;
