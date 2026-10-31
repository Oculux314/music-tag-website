import cors from "cors";
import express from "express";
import type { HealthResponse } from "@music-tag/shared";
import { env } from "./utils/env.js";

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const result: HealthResponse = { status: "ok" };
  response.json(result);
});
