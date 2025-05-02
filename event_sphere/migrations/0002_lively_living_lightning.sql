CREATE TYPE "public"."image_source" AS ENUM('local', 'external');--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"source_type" "image_source" DEFAULT 'local' NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "product_image_unique" ON "product_images" USING btree ("product_id","image_url");