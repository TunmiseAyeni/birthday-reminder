# Birthday Reminder App

Sends birthday emails automatically. Register once with your name, email, and date of birth — every year on your birthday, you get an email.

## Stack
Node.js, TypeScript, Express, PostgreSQL (Supabase), Nodemailer, node-cron

## Setup

1. Clone the repo and run `npm install`
2. Create a `.env` file using `.env.example` as a guide
3. Run the database migration in your Supabase SQL editor:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  date_of_birth DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Run the app with `npm run dev`

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server runs on |
| `DATABASE_URL` | Supabase connection string |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail App Password |

> The cron job runs at 7am daily (`Africa/Lagos`). To test it manually, hit `GET /api/run-birthday-check`.