# Real Estate Investment Application

An application for real estate investment in land properties.

## User Journeys

1. [Register and Login](docs/journeys/register-and-login.md) - Users (owners and investors) can register and login to the app.
2. [Owner Adds Property](docs/journeys/owner-adds-property.md) - Owners can list their properties with details and official documents.
3. [Investor Searches Properties](docs/journeys/investor-searches-properties.md) - Investors can search and view listed properties.
4. [Investor Requests Appointment](docs/journeys/investor-requests-appointment.md) - Investors can request appointments for properties.
5. [Admin Manages Appointments](docs/journeys/admin-manages-appointments.md) - Admin approves appointments and views reports and statistics.

## External APIs

- **Supabase**: Used for authentication.
- **Resend**: Used for sending emails for appointment confirmations.

## Environment Variables

List all required environment variables in the `.env` file:

- COCKROACH_DB_URL - Connection string for the database.
- VITE_PUBLIC_APP_ID - Application ID.
- VITE_PUBLIC_SENTRY_DSN - Sentry DSN for error logging.
- VITE_PUBLIC_APP_ENV - Application environment (development, production).
- VITE_PUBLIC_UMAMI_WEBSITE_ID - ID for Umami analytics.
- RESEND_API_KEY - API key for Resend.
