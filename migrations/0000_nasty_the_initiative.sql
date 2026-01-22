CREATE TABLE "aspects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"category_prefix" text,
	"source_type" text,
	"source_id" uuid,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "keeper_classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"can_always" text[]
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"subtype" text,
	"actions" integer NOT NULL,
	"focus" integer,
	"range" text,
	"num_targets" integer,
	"target_type" text,
	"aoe_shape" text,
	"aoe_radius" integer,
	"aoe_height" integer,
	"aoe_length" integer,
	"aoe_width" integer,
	"source_type" text,
	"source_id" uuid,
	"description" text,
	"damage_types" text,
	"statuses" text,
	"restore_types" text,
	"tags" text
);
--> statement-breakpoint
CREATE TABLE "subclasses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"domain_id" uuid NOT NULL,
	"class_id" uuid NOT NULL
);
