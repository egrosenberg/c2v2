ALTER TABLE "aspects" ADD COLUMN "_idx" bigserial NOT NULL;--> statement-breakpoint
ALTER TABLE "aspects" ADD COLUMN "_table" text DEFAULT 'aspects' NOT NULL;--> statement-breakpoint
ALTER TABLE "aspects" ADD COLUMN "_created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "aspects" ADD COLUMN "_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "domains" ADD COLUMN "_idx" bigserial NOT NULL;--> statement-breakpoint
ALTER TABLE "domains" ADD COLUMN "_table" text DEFAULT 'domains' NOT NULL;--> statement-breakpoint
ALTER TABLE "domains" ADD COLUMN "_created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "domains" ADD COLUMN "_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "_idx" bigserial NOT NULL;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "_table" text DEFAULT 'keeper_classes' NOT NULL;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "_created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD COLUMN "_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "_idx" bigserial NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "_table" text DEFAULT 'skills' NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "_created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "_updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subclasses" ADD COLUMN "_idx" bigserial NOT NULL;--> statement-breakpoint
ALTER TABLE "subclasses" ADD COLUMN "_table" text DEFAULT 'subclasses' NOT NULL;--> statement-breakpoint
ALTER TABLE "subclasses" ADD COLUMN "_created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subclasses" ADD COLUMN "_updated_at" timestamp DEFAULT now() NOT NULL;