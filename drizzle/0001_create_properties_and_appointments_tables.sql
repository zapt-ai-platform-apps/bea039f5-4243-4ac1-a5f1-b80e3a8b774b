CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "document_url" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "appointments" (
  "id" SERIAL PRIMARY KEY,
  "property_id" INTEGER NOT NULL,
  "investor_id" UUID NOT NULL,
  "status" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("property_id") REFERENCES "properties"("id")
);