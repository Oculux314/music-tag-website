import { defineRelations } from "drizzle-orm";
import { account } from "./tables/account.js";
import { session } from "./tables/session.js";
import { user } from "./tables/user.js";
import { verification } from "./tables/verification.js";

export * from "./tables/account.js";
export * from "./tables/session.js";
export * from "./tables/user.js";
export * from "./tables/verification.js";

export const authRelations = defineRelations({ user, session, account, verification }, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
}));
