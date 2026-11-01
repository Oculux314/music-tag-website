import { defineRelations } from "drizzle-orm";
import { account } from "./tables/account";
import { session } from "./tables/session";
import { user } from "./tables/user";
import { verification } from "./tables/verification";

export * from "./tables/account";
export * from "./tables/session";
export * from "./tables/user";
export * from "./tables/verification";

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
