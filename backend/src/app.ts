import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import type { HealthResponse } from "@music-tag/shared";
import { createGraphQLMiddleware } from "./graphql";
import { auth } from "./utils/auth";
import { env } from "./utils/env";

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/graphql", await createGraphQLMiddleware());

app.get("/api/health", (_request, response) => {
  const result: HealthResponse = { status: "ok" };
  response.json(result);
});
