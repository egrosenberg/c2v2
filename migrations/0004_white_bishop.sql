CREATE TABLE "status_combinations" (
	"_idx" bigserial PRIMARY KEY NOT NULL,
	"status_a" uuid NOT NULL,
	"status_b" uuid NOT NULL,
	"operation" text,
	"product" uuid,
	CONSTRAINT "status_combinations_product_unique" UNIQUE("product")
);
--> statement-breakpoint
CREATE TABLE "status_damage_modifiers" (
	"_idx" bigserial PRIMARY KEY NOT NULL,
	"status_id" uuid NOT NULL,
	"damage_type" text NOT NULL,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "status_damage_ticks" (
	"_idx" bigserial PRIMARY KEY NOT NULL,
	"status_id" uuid NOT NULL,
	"damage_type" text NOT NULL,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "statuses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"_idx" bigserial NOT NULL,
	"_table" text DEFAULT 'statuses' NOT NULL,
	"_created_at" timestamp DEFAULT now() NOT NULL,
	"_updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"resisted_by" text,
	"duration" integer,
	"description" text,
	CONSTRAINT "statuses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "tenets" text[];--> statement-breakpoint
ALTER TABLE "status_combinations" ADD CONSTRAINT "status_combinations_status_a_statuses_id_fk" FOREIGN KEY ("status_a") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "status_combinations" ADD CONSTRAINT "status_combinations_status_b_statuses_id_fk" FOREIGN KEY ("status_b") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "status_combinations" ADD CONSTRAINT "status_combinations_product_statuses_id_fk" FOREIGN KEY ("product") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "status_damage_modifiers" ADD CONSTRAINT "status_damage_modifiers_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "status_damage_ticks" ADD CONSTRAINT "status_damage_ticks_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;