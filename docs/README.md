# Surf School Booking System - Documentation

## 1. Project Overview

This document describes the architecture, requirements, and implementation decisions for a surf school booking system MVP. The system automates manual booking and enquiry handling for a surf school in India, providing a mobile-friendly booking form, WhatsApp FAQ auto-responder, Razorpay payment integration, and an admin dashboard for staff management.

The surf school offers multi-day surf courses (3 to 30 days) with optional stay accommodations. Students can book online, pay 50% in advance via Razorpay, and pay the remaining 50% at the venue. Staff manage bookings through a dedicated admin dashboard, handling attendance tracking, batch assignments, and payment status updates.

The target users are prospective surf students (primarily mobile users), and the surf school staff who manage daily operations. The system is designed as an MVP with the flexibility to expand features in future iterations.

## 2. Requirements

### 2.1 Core Features

**Booking Form (Mobile Web)**

- Course selection with duration options (3-day, 5-day, 7-day, 14-day, 30-day packages)
- Stay option selection (dorm AC, dorm non-AC, room AC, room non-AC)
- Date picker for course start date
- Real-time price calculation showing course cost, stay cost, and total
- Customer information collection (name, email, phone)
- Waiver acknowledgment checkbox
- Form validation with error messages
- Loading states during submission

**Payment Integration**

- Razorpay payment link generation for 50% of total booking amount
- Payment link sent via email to customer
- Webhook handler to receive payment status updates
- Signature verification for webhook security
- Staff ability to mark remaining 50% payment as paid at venue

**WhatsApp Auto-Responder**

- Inbound-only WhatsApp webhook integration
- Auto-response to FAQ keywords (timing, price, location, contact)
- Fallback response with contact information
- Webhook verification (hub.challenge) for Meta API setup

**Admin Dashboard**

- Login page with authentication
- Booking list view with filtering (by date, status)
- Booking detail view with payment status management
- Attendance marking per booking per day (present, absent, no-show)
- Batch assignment for multi-day courses (staff assigns per day)
- Daily roster view with calendar/date picker

**Email Notifications**

- Booking confirmation email with details and payment link
- Waiver link email trigger
- Uses Resend for transactional emails

### 2.2 Business Rules

**Pricing**

- Base course price: ₹1,300 per day
- Stay pricing (dummy data, configurable via database):
  - Dorm AC: ₹500 per day
  - Dorm non-AC: ₹300 per day
  - Room AC: ₹800 per day
  - Room non-AC: ₹500 per day
- Total price formula: (course_days × ₹1,300) + (stay_price_per_day × course_days)
- Payment structure: 50% via Razorpay, 50% at venue

**Batches**

- 4 batches per day: 7am, 9am, 11am, 1pm
- Each batch can accommodate multiple students
- For multi-day courses, batch assignment can vary per day (staff decides)

**Cancellation Policy**

- 24-hour cancellation notice required
- No-shows: no refund

**Waiver**

- Simple checkbox acceptance for MVP
- PDF with digital signature to be added later

### 2.3 Technical Requirements

**Architecture**

- Monorepo structure using Turborepo
- Backend: Express.js REST API
- Frontend: Next.js 14 with App Router
- Database: SQLite with Prisma ORM (PostgreSQL-ready)
- Shared package: @surf-school/common for types, Zod schemas, utilities

**Integrations**

- WhatsApp: Meta Cloud API (inbound only)
- Payments: Razorpay (payment links + webhooks)
- Email: Resend API

**Constraints**

- No automated tests (per user request)
- No WhatsApp outbound messages (inbound auto-responder only)
- No digital signature for waiver (simple checkbox only)
- No multi-property support (single property MVP)
- Staff manually marks remaining payment as paid at venue

## 3. Technical Architecture

### 3.1 Project Structure

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

### 3.2 Database Schema

The database uses Prisma ORM with SQLite for development. The following models are defined:

**Booking**: Core entity storing customer booking information. Contains customerName, customerEmail, startDate, endDate, status (pending/confirmed/cancelled), paymentStatus (pending/paid/failed/refunded), totalPrice, and razorpayPaymentId. Relations: course (optional), stayOption (optional), batchAssignments (multi-day).

**Course**: Surf course packages. Contains name, description, price, duration (in days), maxStudents. Pre-seeded with 3-day, 5-day, 7-day, 14-day, and 30-day options.

**StayOption**: Accommodation options. Contains name, description, pricePerNight, maxGuests. Relations: property. Pre-seeded with dorm and room options at different price points.

**Property**: Physical property where stay options are located. Contains name, address, description.

**Batch**: Time slots for surf lessons. Contains name, startDate, endDate, maxCapacity. Relations: course (optional), instructor (optional). Pre-seeded with 4 daily batches.

**BookingBatchAssignment**: Links bookings to batches for multi-day courses. Contains bookingId, batchId, date. Supports different batch assignments per day.

**Instructor**: Surf instructors. Contains name, email (unique), phone, specialty.

### 3.3 API Endpoints

**Health Check**

- GET /health - Returns server status

**Bookings**

- POST /bookings - Create new booking (validates Zod schema, creates in database, generates Razorpay payment link)
- GET /bookings - List bookings with optional filters (date, status)
- GET /bookings/:id - Get single booking details
- PATCH /bookings/:id - Update booking status, payment info, attendance
- POST /bookings/:id/mark-remaining-paid - Mark remaining 50% as paid

**Stay Options**

- GET /stay-options - List all available stay options from database

**Batches**

- GET /batches - List batches (optionally filtered by date)

**Webhooks**

- GET /webhooks/whatsapp - WhatsApp webhook verification (hub.challenge)
- POST /webhooks/whatsapp - Receive WhatsApp messages, trigger auto-responder
- POST /webhooks/razorpay - Receive payment status updates, validate signature

### 3.4 Shared Package (@surf-school/common)

The common package provides:

**Types**: TypeScript interfaces for Booking, Course, StayOption, Property, Batch, Instructor, and enums for BookingStatus.

**Zod Schemas**: Validation schemas matching database models for server-side input validation.

**Price Calculation**: calculateTotal function computing course cost + stay cost with formula: (courseDays × 1,300) + (stayPricePerNight × courseDays).

### 3.5 Frontend Pages

**Customer Booking App (apps/web)**

- / - Home page with booking flow entry
- /booking - Main booking form with course selection, stay options, date picker, price breakdown, customer details, waiver checkbox

**Admin Dashboard (apps/admin)**

- /login - Staff login page
- /(dashboard) - Main dashboard with sidebar navigation
- /(dashboard)/bookings - Booking list with filters
- /(dashboard)/bookings/[id] - Booking detail with payment management
- /(dashboard)/roster - Daily roster view with calendar/date picker

## 4. Key Decisions

### 4.1 WhatsApp Strategy

**Decision**: Use WhatsApp for inbound auto-responder only, avoid outbound templates.

**Rationale**: Meta WhatsApp Cloud API requires business verification and pre-approved message templates for outbound messages. This adds complexity and potential delays. By limiting to inbound only, the system can respond to customer enquiries automatically within the 24-hour free messaging window without requiring template approval.

**Implementation**: Webhook receives incoming messages, keyword matching determines response (timing, price, location, contact), fallback provides general contact information.

### 4.2 Payment Flow

**Decision**: 50% payment via Razorpay link, 50% payment at venue.

**Rationale**: The surf school operates in India where cash and UPI payments at venue are common. Requiring full advance payment would reduce conversion. The 50% advance reserves the booking, and staff marks the remaining payment as paid when customers arrive.

**Implementation**: On booking creation, Razorpay payment link is generated for 50% of total amount. Webhook updates booking status to "confirmed" on successful payment. Staff sees pending balance in admin dashboard and clicks to mark as paid.

### 4.3 Database Choice

**Decision**: SQLite with Prisma for MVP, PostgreSQL-ready schema.

**Rationale**: SQLite requires no setup and works out of the box for development. Prisma schema is database-agnostic and can be migrated to PostgreSQL for production with minimal changes. This allows rapid prototyping while maintaining production readiness.

### 4.4 Batch Assignment for Multi-Day Courses

**Decision**: Staff manually assigns batch for each day of multi-day courses.

**Rationale**: The surf school prefers flexibility in assigning students to batches based on weather, instructor availability, and student skill levels. Automating this would require complex rules and might not match operational needs. Manual assignment via admin dashboard provides the right balance of control and convenience.

**Implementation**: BookingBatchAssignment model links booking to batch per date. Admin roster view shows bookings for selected date, staff can assign/change batch assignment.

### 4.5 Stay Pricing Model

**Decision**: Store stay prices in database as configurable dummy data.

**Rationale**: Pricing may change seasonally or based on property updates. Storing in database rather than hardcoding allows staff to update prices without code changes. For MVP, pre-seeded with representative prices; CRM functionality to manage prices can be added later.

### 4.6 Waiver Approach

**Decision**: Simple checkbox acceptance for MVP, PDF with digital signature later.

**Rationale**: Digital signature adds significant complexity (document generation, signature capture, storage, legal compliance). Starting with a simple checkbox reduces MVP scope while capturing the requirement. The waiver link is sent via email; physical signing can occur at venue.

### 4.7 Monorepo Architecture

**Decision**: Use Turborepo for monorepo with apps/api, apps/web, apps/admin, and packages/common.

**Rationale**: Sharing types and validation schemas between frontend and backend prevents drift and reduces duplicate code. Turborepo provides efficient caching and parallel execution. The structure scales well as the project grows.

## 5. API Reference

### 5.1 Booking Endpoints

**POST /bookings**

Creates a new booking and generates Razorpay payment link.

Request body:

```json
{
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "string",
  "courseId": "uuid",
  "stayOptionId": "uuid (optional)",
  "startDate": "ISO date string",
  "courseDays": "number",
  "waiverAccepted": "boolean"
}
```

Response:

```json
{
  "booking": { ... },
  "paymentLink": "https://razorpay.com/..."
}
```

**GET /bookings**

Lists bookings with optional query parameters: startDate, endDate, status.

**PATCH /bookings/:id**

Updates booking status or payment information.

**POST /bookings/:id/mark-remaining-paid**

Marks the remaining 50% payment as paid (staff action).

### 5.2 Webhook Endpoints

**GET /webhooks/whatsapp**

Meta webhook verification. Returns hub.challenge query parameter.

**POST /webhooks/whatsapp**

Receives incoming WhatsApp messages. Triggers auto-responder based on keyword matching.

**POST /webhooks/razorpay**

Receives payment status updates. Validates X-Razorpay-Signature header. Updates booking paymentStatus on successful payment.

## 6. Environment Variables

Required environment variables (see .env.example):

- DATABASE_URL - Database connection string
- RAZORPAY_KEY_ID - Razorpay API key ID
- RAZORPAY_KEY_SECRET - Razorpay API key secret
- WHATSAPP_WEBHOOK_VERIFY_TOKEN - Token for WhatsApp webhook verification
- WHATSAPP_ACCESS_TOKEN - Meta WhatsApp access token
- RESEND_API_KEY - Resend API key for emails
- ADMIN_EMAIL - Admin login email
- ADMIN_PASSWORD - Admin login password

## 7. Future Considerations

**Phase 2 Features** (not in MVP scope):

- Digital signature for waiver (DocuSign integration)
- WhatsApp outbound messages with approved templates
- Multi-property support
- Instructor management
- Equipment (surfboard) tracking
- Automated refund processing
- Reporting and analytics
- SMS notifications

**Production Deployment**:

- Migrate from SQLite to PostgreSQL
- Set up authentication for admin (currently basic)
- Add rate limiting on API endpoints
- Configure proper HTTPS
- Set up monitoring and logging
- Configure Razorpay webhook retry logic

## 8. Quick Start

1. Install dependencies: npm install
2. Set up environment: cp .env.example .env (fill in values)
3. Initialize database: npx prisma db push
4. Seed data: npx prisma db seed
5. Start development: npm run dev
   - API: http://localhost:4000
   - Web (booking): http://localhost:3000
   - Admin: http://localhost:3001

Build all apps: npm run build

## 9. File Inventory

| Path | Description |
|------|-------------|
| turbo.json | Turborepo configuration |
| package.json | Root package with dev scripts |
| apps/api/src/index.js | Express server entry point |
| apps/api/src/routes/bookings.js | Booking API endpoints |
| apps/api/src/routes/webhooks.js | Webhook handlers |
| apps/api/src/services/email.ts | Resend email service |
| apps/api/src/services/razorpay.ts | Razorpay payment links |
| apps/api/src/services/whatsapp-auto-responder.js | WhatsApp FAQ responder |
| apps/web/src/app/booking/page.tsx | Customer booking form |
| apps/admin/src/app/(dashboard)/bookings/page.tsx | Admin booking list |
| apps/admin/src/app/(dashboard)/bookings/[id]/page.tsx | Booking detail |
| apps/admin/src/app/(dashboard)/roster/page.tsx | Daily roster view |
| packages/common/src/index.ts | Shared exports |
| packages/common/src/types.ts | TypeScript interfaces |
| packages/common/src/schemas.ts | Zod validation schemas |
| packages/common/src/price.ts | Price calculation logic |
| prisma/schema.prisma | Database schema |
| prisma/seed.ts | Seed data script |
