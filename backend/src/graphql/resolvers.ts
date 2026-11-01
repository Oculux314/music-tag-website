import type { Resolvers } from "./__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    me: (_parent, _args, { session }) =>
      session ? { ...session.user, image: session.user.image ?? null } : null,
  },
};
