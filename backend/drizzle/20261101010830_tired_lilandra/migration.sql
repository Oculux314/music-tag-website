CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"source" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"default_media_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"media_group_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"media_id" uuid NOT NULL,
	"media_group_id" uuid NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "user_media_id_group_unique" UNIQUE("id","media_group_id")
);
--> statement-breakpoint
CREATE INDEX "media_source_idx" ON "media" ("source");--> statement-breakpoint
CREATE INDEX "media_group_user_id_idx" ON "media_group" ("user_id");--> statement-breakpoint
CREATE INDEX "media_group_default_media_id_idx" ON "media_group" ("default_media_id");--> statement-breakpoint
CREATE INDEX "tag_media_group_id_idx" ON "tag" ("media_group_id");--> statement-breakpoint
CREATE INDEX "user_media_media_id_idx" ON "user_media" ("media_id");--> statement-breakpoint
CREATE INDEX "user_media_media_group_id_idx" ON "user_media" ("media_group_id");--> statement-breakpoint
ALTER TABLE "media_group" ADD CONSTRAINT "media_group_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "media_group" ADD CONSTRAINT "media_group_default_media_same_group_fkey" FOREIGN KEY ("default_media_id","id") REFERENCES "user_media"("id","media_group_id") DEFERRABLE INITIALLY DEFERRED;--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_media_group_id_media_group_id_fkey" FOREIGN KEY ("media_group_id") REFERENCES "media_group"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_media" ADD CONSTRAINT "user_media_media_id_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id");--> statement-breakpoint
ALTER TABLE "user_media" ADD CONSTRAINT "user_media_media_group_id_media_group_id_fkey" FOREIGN KEY ("media_group_id") REFERENCES "media_group"("id") ON DELETE CASCADE;
