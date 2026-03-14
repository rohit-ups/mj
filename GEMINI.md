# Surf School Booking System

## Project Overview
A comprehensive MVP for a surf school booking system designed to automate manual enquiries and bookings. The project uses a monorepo structure managed by Turborepo.

### Core Features
- **Booking Form:** Mobile-first Next.js application for course and accommodation selection.
- **Admin Dashboard:** Next.js application for staff to manage bookings, attendance, and payments.
- **API Backend:** Express.js REST API handling business logic, database interactions, and integrations.
- **Integrations:**
    - **Payments:** Razorpay (50% advance via payment links, 50% at venue).
    - **Messaging:** WhatsApp Meta Cloud API (inbound-only auto-responder).
    - **Email:** Resend for transactional notifications.

### Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS (Neo-Brutalist aesthetic).
- **Backend:** Express.js, Prisma ORM.
- **Database:** SQLite (for development), PostgreSQL-ready.
- **Monorepo:** Turborepo.

## Architecture
```
surf-school/
├── apps/
│   ├── api/              # Express.js REST API (port 4000)
│   ├── web/              # Next.js customer booking app (port 3000)
│   └── admin/            # Next.js admin dashboard (port 3001)
├── packages/
│   └── common/           # Shared types, Zod schemas, utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data script
└── turbo.json            # Turborepo configuration
```

## Building and Running

### Prerequisites
- Node.js (v20+)
- npm
- Docker and Docker Compose

### Local Infrastructure Setup
Before running the apps, start the infrastructure (PostgreSQL, Redis):
```bash
docker-compose up -d
```
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- PgAdmin: `http://localhost:5050` (User: `admin@example.com`, Pass: `admin`)

### Installation
```bash
npm install
```

### Database Setup
To use PostgreSQL (instead of the default SQLite):
1.  Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`.
2.  Update `DATABASE_URL` in your `.env` file using the value from `.env.example`.
3.  Run `npx prisma db push` to initialize the database in Postgres.

### Development
From the root directory:
```bash
npm run dev
```
- Customer Web: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3001`
- API Health Check: `http://localhost:4000/health`

### Build
```bash
npm run build
```

## Development Conventions

### Code Style
- **Aesthetic:** Neo-Brutalist (high contrast, bold borders, terminal-inspired).
- **Frontend:** Use Tailwind CSS for styling. Prefer Lucide icons.
- **Shared Logic:** Always place shared types, Zod schemas, and business logic (like price calculation) in `packages/common`.

### Database
- **Schema:** Managed via Prisma. Ensure enum values are used correctly in defaults (not strings).
- **Client:** Use a singleton pattern for the Prisma client in the API.

### Testing & QA
- **No Automated Tests:** Per project requirements, focus on feature implementation.
- **Manual Verification:** Every change should be verified manually across the relevant app and API.
- **QA Scenarios:** Document manual testing steps in tasks.

### Integration Guardrails
- **WhatsApp:** Inbound-only. Do NOT implement outbound template messages unless explicitly requested.
- **Payments:** Follow the 50/50 payment split logic.

## Environment Variables
Create a `.env` file in the root or specific app directories with:
- `DATABASE_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
