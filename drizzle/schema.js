import { pgTable, serial, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  owner_id: uuid('owner_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  document_url: text('document_url'),
  created_at: timestamp('created_at').defaultNow(),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  property_id: serial('property_id').notNull(),
  investor_id: uuid('investor_id').notNull(),
  status: text('status').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});