import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "./middleware/rateLimiter";
import { marketplaceAdminSign } from "./services/admin";
import bodyParser from "body-parser";
import morganMiddleware from "./middleware/morgan";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(rateLimiter);
app.use(morganMiddleware);

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Admin Sign Transaction
app.post("/api/sign-transaction", async (req, res) => {
  marketplaceAdminSign(req, res);
});

export default app;
