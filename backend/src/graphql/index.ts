import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";
import { db } from "@/db";
import { auth } from "@/utils/auth";
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

export type GraphQLContext = {
  db: typeof db;
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
};

const apolloServer = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

export async function createGraphQLMiddleware(): Promise<RequestHandler> {
  await apolloServer.start();

  return expressMiddleware(apolloServer, {
    context: async ({ req }) => ({
      db,
      session: await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      }),
    }),
  });
}
