import * as Sentry from "@sentry/node";
import { authenticateUser } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { appointments } from '../drizzle/schema.js';

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

    if (req.method === 'POST') {
      const { property_id } = req.body;

      if (!property_id) {
        return res.status(400).json({ error: 'Property ID is required' });
      }

      const newAppointment = await db.insert(appointments).values({
        property_id: parseInt(property_id),
        investor_id: user.id,
        status: 'pending'
      }).returning();

      res.status(201).json(newAppointment[0]);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}