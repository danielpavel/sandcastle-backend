import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "./middleware/rateLimiter";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

export default app;
