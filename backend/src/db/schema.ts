import { defineRelations } from "drizzle-orm";
import { account } from "./tables/account";
import { media } from "./tables/media";
import { mediaGroup } from "./tables/mediaGroup";
import { session } from "./tables/session";
import { tag } from "./tables/tag";
import { user } from "./tables/user";
import { userMedia } from "./tables/userMedia";
import { verification } from "./tables/verification";

export * from "./tables/account";
export * from "./tables/session";
export * from "./tables/user";
export * from "./tables/verification";

export * from "./tables/media";
export * from "./tables/mediaGroup";
export * from "./tables/tag";
export * from "./tables/userMedia";

export const dbRelations = defineRelations(
  { user, session, account, verification, media, mediaGroup, userMedia, tag },
  (r) => ({
    user: {
      sessions: r.many.session(),
      accounts: r.many.account(),
      mediaGroups: r.many.mediaGroup(),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
        optional: false,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
        optional: false,
      }),
    },
    media: {
      userMedia: r.many.userMedia(),
    },
    mediaGroup: {
      user: r.one.user({
        from: r.mediaGroup.userId,
        to: r.user.id,
        optional: false,
      }),
      defaultMedia: r.one.userMedia({
        from: [r.mediaGroup.defaultMediaId, r.mediaGroup.id],
        to: [r.userMedia.id, r.userMedia.mediaGroupId],
        optional: false,
      }),
      userMedia: r.many.userMedia({
        from: r.mediaGroup.id,
        to: r.userMedia.mediaGroupId,
      }),
      tags: r.many.tag(),
    },
    userMedia: {
      media: r.one.media({
        from: r.userMedia.mediaId,
        to: r.media.id,
        optional: false,
      }),
      mediaGroup: r.one.mediaGroup({
        from: r.userMedia.mediaGroupId,
        to: r.mediaGroup.id,
        optional: false,
      }),
      defaultForGroups: r.many.mediaGroup({
        from: [r.userMedia.id, r.userMedia.mediaGroupId],
        to: [r.mediaGroup.defaultMediaId, r.mediaGroup.id],
      }),
    },
    tag: {
      mediaGroup: r.one.mediaGroup({
        from: r.tag.mediaGroupId,
        to: r.mediaGroup.id,
        optional: false,
      }),
    },
  }),
);
