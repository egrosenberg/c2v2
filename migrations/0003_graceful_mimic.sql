CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"_idx" bigserial NOT NULL,
	"_table" text DEFAULT 'users' NOT NULL,
	"_created_at" timestamp DEFAULT now() NOT NULL,
	"_updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"display_name" text,
	"first_name" text,
	"last_name" text,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
