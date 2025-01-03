import * as Sentry from "@sentry/node";
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { properties } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);

    const sql = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(sql);

    if (req.method === 'GET') {
      const { id } = req.query;
      let result;

      if (id) {
        result = await db.select().from(properties).where(eq(properties.id, parseInt(id)));
      } else if (user.user_metadata.role === 'owner') {
        result = await db.select().from(properties).where(eq(properties.owner_id, user.id));
      } else {
        result = await db.select().from(properties);
      }
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      if (user.user_metadata.role !== 'owner') {
        return res.status(403).json({ error: 'Only owners can add properties' });
      }

      const { title, description, document_url } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const newProperty = await db.insert(properties).values({
        owner_id: user.id,
        title,
        description,
        document_url
      }).returning();

      res.status(201).json(newProperty[0]);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}