CREATE TABLE "search_index" (
	"aspect" uuid,
	"domain" uuid,
	"keeper_class" uuid,
	"skill" uuid,
	"subclass" uuid,
	CONSTRAINT "search_index_aspect_unique" UNIQUE("aspect"),
	CONSTRAINT "search_index_domain_unique" UNIQUE("domain"),
	CONSTRAINT "search_index_keeper_class_unique" UNIQUE("keeper_class"),
	CONSTRAINT "search_index_skill_unique" UNIQUE("skill"),
	CONSTRAINT "search_index_subclass_unique" UNIQUE("subclass")
);
--> statement-breakpoint
ALTER TABLE "search_index" ADD CONSTRAINT "search_index_aspect_aspects_id_fk" FOREIGN KEY ("aspect") REFERENCES "public"."aspects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_index" ADD CONSTRAINT "search_index_domain_domains_id_fk" FOREIGN KEY ("domain") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_index" ADD CONSTRAINT "search_index_keeper_class_keeper_classes_id_fk" FOREIGN KEY ("keeper_class") REFERENCES "public"."keeper_classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_index" ADD CONSTRAINT "search_index_skill_skills_id_fk" FOREIGN KEY ("skill") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_index" ADD CONSTRAINT "search_index_subclass_subclasses_id_fk" FOREIGN KEY ("subclass") REFERENCES "public"."subclasses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domains" ADD CONSTRAINT "domains_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "keeper_classes" ADD CONSTRAINT "keeper_classes_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "subclasses" ADD CONSTRAINT "subclasses_name_unique" UNIQUE("name");