ALTER TABLE "keeper_classes" ADD COLUMN "vitals" jsonb DEFAULT '{"hp":"","gd":"","wd":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "virtue" text;