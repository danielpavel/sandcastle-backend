import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";

const apiKeyCheck = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid API key" });
  }

  next();
};

export default apiKeyCheck;
