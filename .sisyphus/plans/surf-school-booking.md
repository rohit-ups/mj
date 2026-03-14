# Surf School Booking System - MVP Scaffolding

## TL;DR

> **Quick Summary**: Monorepo booking system with mobile web form, WhatsApp inbound auto-responder, Razorpay payments (50% advance), admin dashboard, and email notifications.

> **Deliverables**:
> - Monorepo structure with apps/web, apps/admin, apps/api, packages/common
> - PostgreSQL schema with Prisma
> - Booking form with pricing calculator (dummy data)
> - WhatsApp webhook for inbound FAQ auto-response
> - Razorpay payment link integration
> - Admin dashboard for roster/attendance/payments
> - Email notification service

> **Estimated Effort**: Medium-Large
> **Parallel Execution**: YES - multiple waves
> **Critical Path**: Schema → API core → Booking form → Admin → WhatsApp/Payment integrations

---

## Context

### Original Request
Build a surf school booking system MVP to automate manual booking/enquiries handling.

### Interview Summary

**Key Discussions**:
- Courses: 3-day, 5-day, up to 30-day packages at ₹1300/day + stay options
- Stay: Multiple properties (dorms/rooms, AC/non-AC) with dummy pricing
- Batches: 4 per day (7am, 9am, 11am, 1pm), staff assigns per day for multi-day courses
- Payment: 50% via Razorpay link, 50% at venue (staff marks paid)
- WhatsApp: Inbound only, 24hr free window, auto-responder for FAQs
- Waiver: Simple checkbox now, PDF with digital signature later
- Admin: Roster, attendance, payment status management
- No tests for now, focus on features

**Tech Stack Decisions**:
- Monorepo with Turborepo
- Backend: Express (keep simple)
- Frontend: Next.js (App Router)
- DB: PostgreSQL + Prisma
- WhatsApp: Meta Cloud API (inbound only)
- Payments: Razorpay
- Email: Resend

### Assumptions Made
- Stay options pricing will be dummy data, configurable via DB later
- Single property for MVP (expandable to multiple)
- No test infrastructure (user preference)
- No digital signature for waiver (checkbox only)

---

## Work Objectives

### Core Objective
Build an MVP booking system that handles course selection, stay options, payment collection, and admin management for a surf school.

### Concrete Deliverables

| Deliverable | Description |
|-------------|-------------|
| `apps/api` | Express backend with REST endpoints |
| `apps/web` | Mobile booking form (Next.js) |
| `apps/admin` | Staff dashboard (Next.js) |
| `packages/common` | Shared types, Zod schemas, utilities |
| Database | PostgreSQL + Prisma schema |
| WhatsApp | Inbound webhook with auto-responder |
| Payments | Razorpay payment link creation + webhook |
| Email | Resend integration for notifications |

### Definition of Done
- [ ] Monorepo runs with `turbo dev` (all 3 apps)
- [ ] Booking form calculates price correctly with dummy data
- [ ] Staff can view bookings in admin dashboard
- [ ] WhatsApp responds to incoming messages with FAQ answers
- [ ] Payment link generated and webhook updates booking status

### Must Have
- Mobile-responsive booking form
- Real-time pricing calculation (course + stay)
- WhatsApp FAQ auto-response
- Razorpay payment link generation
- Admin dashboard with roster view
- Email notifications for booking confirmations
- 24hr cancellation rule logic

### Must NOT Have (Guardrails)
- No WhatsApp outbound (no message templates)
- No digital signature for waiver (simple checkbox only)
- No complex scheduling algorithm (staff assigns batches manually)
- No multi-property support (single property MVP)
- No automated refunds (staff-initiated only)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: NO (per user request)
- **Agent-Executed QA**: Every task will include QA scenarios for manual verification

### QA Policy
Frontend UI verified via Playwright, API endpoints via curl, CLI tools via interactive_bash.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - can run parallel):
├── T1: Monorepo setup (Turborepo + package.json)
├── T2: PostgreSQL + Prisma schema
├── T3: Shared package (types + Zod schemas)
├── T4: Express API skeleton + routes
├── T5: Next.js web app skeleton
├── T6: Next.js admin app skeleton
└── T7: Email service setup (Resend)

Wave 2 (Core Logic - depends on Wave 1):
├── T8: Database seed (stay options, batches, pricing dummy data)
├── T9: Booking form UI (course selection, stay options)
├── T10: Price calculation logic
├── T11: Booking API endpoints (create, list, update)
├── T12: Admin dashboard layout + login
├── T13: Admin: booking list view
├── T14: Admin: payment status management
└── T15: WhatsApp webhook setup

Wave 3 (Integrations):
├── T16: Razorpay payment link creation
├── T17: Razorpay webhook handler
├── T18: WhatsApp FAQ auto-responder logic
├── T19: Booking confirmation email
├── T20: Admin: attendance marking
├── T21: Admin: batch assignment for multi-day
└── T22: Waiver link email trigger

Wave 4 (Polish):
├── T23: Form validation + error handling
├── T24: Admin: daily roster view
├── T25: Environment config (.env.example)
├── T26: Basic styling for mobile
└── T27: Deploy docs (Docker compose or single server)

Wave FINAL:
├── F1: Plan compliance audit
├── F2: Build + lint check
└── F3: Manual QA walkthrough
```

### Dependency Matrix
- **T1**: — — T2-T7
- **T2**: T1 — T8-T15, T3
- **T3**: T1 — T9, T11, T13
- **T4**: T1 — T11, T15, T17
- **T5**: T1 — T9, T10
- **T6**: T1 — T12, T13, T14
- **T7**: T1 — T19, T22
- **T8**: T2, T3 — T16, T20
- **T9**: T3, T5 — T10, T11
- **T10**: T9 — T11
- **T11**: T4, T9, T10 — T16, T17, T19, T22
- **T12**: T6 — T13
- **T13**: T3, T12 — T14, T24
- **T14**: T13 — T17
- **T15**: T4 — T18
- **T16**: T8, T11 — T17
- **T17**: T11, T14, T16 — T19
- **T18**: T15 — —
- **T19**: T7, T11, T17 — T22
- **T20**: T8 — T24
- **T21**: T8, T11 — T24
- **T22**: T11, T19 — —
- **T23**: T9, T10, T11 — F3
- **T24**: T13, T20, T21 — F3
- **T25**: T1 — —
- **T26**: T9, T12 — F3
- **T27**: T1, T4, T5, T6 — —

---

## TODOs

- [x] 1. **Monorepo Setup** — `turbo` + `apps/*` + `packages/common`

  **What to do**:
  - Initialize Turborepo with apps/web, apps/admin, apps/api
  - Add shared package @surf-school/common
  - Set up TypeScript, ESLint, Prettier configs
  - Root package.json with dev scripts

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Can run immediately (Wave 1, with T2-T7)

  **References**:
  - Turborepo docs: https://turbo.build/repo/docs

  **Acceptance Criteria**:
  - [ ] `npm run dev` starts all 3 apps (api, web, admin)
  - [ ] `turbo run build` succeeds
  - [ ] Package imports work across apps

  **QA Scenarios**:
  - Run `npm run dev` and verify api, web, admin all start
  - Check localhost:3000 (web), localhost:3001 (admin), localhost:4000 (api)

  **Commit**: YES (Wave 1)
  - Message: `chore: scaffold monorepo with Turborepo`
  - Files: `turbo.json`, `package.json`, `apps/*`, `packages/common`

---

- [x] 2. **Database Schema (Prisma)**

  **What to do**:
  - Prisma schema with models: Booking, Course, StayOption, Property, Batch, Instructor
  - Relations: Booking → Course, Booking → StayOption, Booking → Batch (per day)
  - Enum for booking status (pending, confirmed, cancelled)
  - Seed script with dummy data: stay options, batches, pricing

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 1, can start immediately (with T1, T3-T7)

  **References**:
  - Prisma schema syntax
  - Seed script patterns

  **Acceptance Criteria**:
  - [ ] `npx prisma db push` creates tables
  - [ ] `npx prisma db seed` populates dummy data
  - [ ] `npx prisma studio` runs and shows data

  **QA Scenarios**:
  - Check database tables created correctly
  - Verify seed data in database

  **Commit**: YES (Wave 1)
  - Message: `feat: add Prisma schema with seed data`
  - Files: `prisma/schema.prisma`, `prisma/seed.ts`

---

- [x] 3. **Shared Package (@surf-school/common)**

  **What to do**:
  - TypeScript types for all entities
  - Zod schemas for validation
  - Shared utilities (price calculation, date helpers)
  - Export from index.ts

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 1, with T1, T2, T4-T7

  **References**:
  - Zod schema patterns

  **Acceptance Criteria**:
  - [ ] Types can be imported in api and web
  - [ ] Zod schemas validate correctly

  **QA Scenarios**:
  - Import types in web app and verify autocomplete works

  **Commit**: YES (Wave 1)
  - Message: `feat: add shared types and Zod schemas`
  - Files: `packages/common/src/*.ts`

---

- [x] 4. **Express API Skeleton**

  **What to do**:
  - Express server setup with CORS, JSON parsing
  - Health check endpoint
  - Router structure (bookings, payments, webhooks)
  - Prisma client singleton
  - Error handling middleware

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 1, with T1-T3, T5-T7

  **References**:
  - Express best practices

  **Acceptance Criteria**:
  - [ ] Server starts on port 4000
  - [ ] GET /health returns 200

  **QA Scenarios**:
  - curl http://localhost:4000/health

  **Commit**: YES (Wave 1)
  - Message: `feat: add Express API skeleton`
  - Files: `apps/api/src/index.ts`, `apps/api/src/routes/*`

---

- [x] 5. **Next.js Web App Skeleton**

  **What to do**:
  - Next.js 14 with App Router
  - Tailwind CSS setup
  - Layout with mobile viewport
  - Home page with booking flow entry

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 1, with T1-T4, T6-T7

  **References**:
  - Next.js App Router patterns

  **Acceptance Criteria**:
  - [ ] Dev server starts on localhost:3000
  - [ ] Page renders without errors

  **QA Scenarios**:
  - Visit http://localhost:3000 in browser

  **Commit**: YES (Wave 1)
  - Message: `feat: add Next.js web app skeleton`
  - Files: `apps/web/src/*`

---

- [x] 6. **Next.js Admin App Skeleton**

  **What to do**:
  - Next.js 14 with App Router
  - Tailwind CSS (shared config)
  - Basic layout with sidebar
  - Login page stub

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 1, with T1-T5, T7

  **References**:
  - Next.js patterns

  **Acceptance Criteria**:
  - [ ] Dev server starts on localhost:3001
  - [ ] Admin login page renders

  **QA Scenarios**:
  - Visit http://localhost:3001 in browser

  **Commit**: YES (Wave 1)
  - Message: `feat: add Next.js admin app skeleton`
  - Files: `apps/admin/src/*`

---

- [x] 7. **Email Service (Resend)**

  **What to do**:
  - Resend client setup
  - Email templates (booking confirmation, waiver link)
  - Send function wrapper

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 1, with T1-T6

  **References**:
  - Resend docs

  **Acceptance Criteria**:
  - [ ] Resend client initializes (can use test API key)
  - [ ] Send function accepts booking data

  **QA Scenarios**:
  - Verify Resend client creation doesn't throw

  **Commit**: YES (Wave 1)
  - Message: `feat: add Resend email service`
  - Files: `apps/api/src/services/email.ts`

---

- [x] 8. **Database Seed - Stay Options & Batches**

  **What to do**:
  - Seed data: 4 batches per day (7am, 9am, 11am, 1pm)
  - Seed data: stay options (dorm AC, dorm non-AC, room AC, room non-AC) with dummy prices
  - Seed data: course types (3-day, 5-day, 7-day, 14-day, 30-day)
  - Base price: ₹1300/day

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T2 (schema), T3 (types)

  **References**:
  - Prisma seed patterns

  **Acceptance Criteria**:
  - [ ] `npx prisma db seed` runs without error
  - [ ] Stay options appear in database
  - [ ] Batches appear in database

  **QA Scenarios**:
  - Run seed, check data in Prisma Studio

  **Commit**: YES (Wave 2)
  - Message: `seed: add stay options, batches, course types`
  - Files: `prisma/seed.ts`

---

- [x] 9. **Booking Form - Course & Stay Selection**

  **What to do**:
  - Form UI: course duration selector (dropdown/buttons)
  - Form UI: stay option selector (cards with price)
  - Form UI: date picker for start date
  - State management for selections

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T3 (types), T5 (web skeleton)

  **References**:
  - Existing booking UI patterns

  **Acceptance Criteria**:
  - [ ] Form renders course options
  - [ ] Form renders stay options
  - [ ] Selection updates state

  **QA Scenarios**:
  - Fill form in browser, verify selections persist

  **Commit**: YES (Wave 2)
  - Message: `feat: add booking form course/stay selection`
  - Files: `apps/web/src/app/booking/page.tsx`

---

- [x] 10. **Price Calculation Logic**

  **What to do**:
  - Calculate: (course_days × ₹1300) + stay_price_per_day × course_days
  - Show breakdown in form (course cost, stay cost, total)
  - Use shared calculation from common package

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T9

  **References**:
  - Price calculation patterns

  **Acceptance Criteria**:
  - [ ] 5-day course + dorm AC shows correct total
  - [ ] Formula: (days × 1300) + (days × stay_rate)

  **QA Scenarios**:
  - Select 5-day + dorm AC (say ₹500/day) → total should be (5×1300)+(5×500)=9000

  **Commit**: YES (Wave 2)
  - Message: `feat: add price calculation logic`
  - Files: `packages/common/src/price.ts`

---

- [x] 11. **Booking API Endpoints**

  **What to do**:
  - POST /bookings - create booking (validates Zod, creates in DB)
  - GET /bookings - list bookings (with filters: date, status)
  - GET /bookings/:id - single booking
  - PATCH /bookings/:id - update status, payment info
  - GET /stay-options - list from DB
  - GET /batches - list for date

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T4 (api skeleton), T9 (form), T10 (price calc)

  **References**:
  - REST API best practices

  **Acceptance Criteria**:
  - [ ] POST /bookings creates record
  - [ ] GET /bookings returns list
  - [ ] GET /stay-options returns data

  **QA Scenarios**:
  - curl POST to create booking
  - curl GET /bookings

  **Commit**: YES (Wave 2)
  - Message: `feat: add booking API endpoints`
  - Files: `apps/api/src/routes/bookings.ts`

---

- [x] 12. **Admin Dashboard Layout**

  **What to do**:
  - Sidebar with nav (Bookings, Roster, Settings)
  - Header with logout
  - Responsive layout
  - Auth guard (stub for now)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T6 (admin skeleton)

  **References**:
  - Dashboard layout patterns

  **Acceptance Criteria**:
  - [ ] Sidebar renders
  - [ ] Navigation works

  **QA Scenarios**:
  - Visit admin pages, verify layout

  **Commit**: YES (Wave 2)
  - Message: `feat: add admin dashboard layout`
  - Files: `apps/admin/src/app/*`

---

- [x] 13. **Admin - Booking List View**

  **What to do**:
  - Table with bookings (date, name, course, stay, status, payment)
  - Filter by date, status
  - Status badges (pending payment, confirmed, etc)
  - Click to expand details

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T12, T3 (types)

  **References**:
  - Table UI patterns

  **Acceptance Criteria**:
  - [ ] Bookings table renders
  - [ ] Data populates from API

  **QA Scenarios**:
  - View booking list in admin

  **Commit**: YES (Wave 2)
  - Message: `feat: add admin booking list view`
  - Files: `apps/admin/src/app/bookings/page.tsx`

---

- [x] 14. **Admin - Payment Status Management**

  **What to do**:
  - Action to mark "advance paid" (Razorpay webhook auto-sets this)
  - Action to mark "remaining paid" (staff clicks when customer pays at venue)
  - Payment history log

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T13

  **References**:
  - Payment status UI patterns

  **Acceptance Criteria**:
  - [ ] Staff can mark remaining as paid
  - [ ] Status updates in DB

  **QA Scenarios**:
  - Click "Mark Paid" button, verify status changes

  **Commit**: YES (Wave 2)
  - Message: `feat: add payment status management in admin`
  - Files: `apps/admin/src/app/bookings/[id]/page.tsx`

---

- [x] 15. **WhatsApp Webhook Setup**

  **What to do**:
  - POST /webhooks/whatsapp - receive messages
  - GET /webhooks/whatsapp - verify webhook (hub.challenge)
  - Store phone number mappings
  - Basic message parsing

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 2, depends on T4 (api skeleton)

  **References**:
  - Meta WhatsApp webhook docs

  **Acceptance Criteria**:
  - [ ] GET returns hub.challenge for verification
  - [ ] POST receives message payload

  **QA Scenarios**:
  - Simulate webhook verification request

  **Commit**: YES (Wave 2)
  - Message: `feat: add WhatsApp webhook endpoints`
  - Files: `apps/api/src/routes/webhooks/whatsapp.ts`

---

- [x] 16. **Razorpay Payment Link Creation**

  **What to do**:
  - Razorpay SDK setup
  - Create payment link for 50% of total
  - Include booking reference in notes
  - Return link URL

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T8 (seed), T11 (booking endpoint)

  **References**:
  - Razorpay payment link docs

  **Acceptance Criteria**:
  - [ ] Payment link created with correct amount
  - [ ] Link returned to frontend

  **QA Scenarios**:
  - Create booking, verify payment link in response

  **Commit**: YES (Wave 3)
  - Message: `feat: add Razorpay payment link creation`
  - Files: `apps/api/src/services/razorpay.ts`

---

- [x] 17. **Razorpay Webhook Handler**

  **What to do**:
  - POST /webhooks/razorpay
  - Validate signature (X-Razorpay-Signature header)
  - On payment.captured → update booking to "advance paid"
  - Handle payment.failed

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T11, T14, T16

  **References**:
  - Razorpay webhook docs

  **Acceptance Criteria**:
  - [ ] Signature verification works
  - [ ] Booking status updates on payment

  **QA Scenarios**:
  - Send test webhook, verify booking updates

  **Commit**: YES (Wave 3)
  - Message: `feat: add Razorpay webhook handler`
  - Files: `apps/api/src/routes/webhooks/razorpay.ts`

---

- [x] 18. **WhatsApp FAQ Auto-Responder**

  **What to do**:
  - FAQ keywords: timing, price, location, contact
  - Pattern matching on incoming message
  - Send contextual reply (using message_id)
  - Fallback: "Contact us at [phone]"

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T15

  **References**:
  - WhatsApp contextual reply docs

  **Acceptance Criteria**:
  - [ ] "timing" returns batch times
  - [ ] "price" returns ₹1300/day info
  - [ ] Unknown returns fallback

  **QA Scenarios**:
  - Send "what's the price?" message, verify response

  **Commit**: YES (Wave 3)
  - Message: `feat: add WhatsApp FAQ auto-responder`
  - Files: `apps/api/src/services/whatsapp-auto-responder.ts`

---

- [x] 19. **Booking Confirmation Email**

  **What to do**:
  - Trigger on booking.confirmed status
  - Email with: booking details, payment link (if pending), waiver link
  - Use Resend service

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T7 (email), T11, T17

  **References**:
  - Resend email API

  **Acceptance Criteria**:
  - [ ] Email sends on booking confirmation
  - [ ] Contains booking details

  **QA Scenarios**:
  - Confirm booking, check email (use Resend test endpoint)

  **Commit**: YES (Wave 3)
  - Message: `feat: add booking confirmation email`
  - Files: `apps/api/src/services/email.ts`

---

- [x] 20. **Admin - Attendance Marking**

  **What to do**:
  - Per booking, per day attendance toggle
  - Mark: present, absent, no-show
  - No-show: no refund logic (just flag)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T8 (seed), T14

  **References**:
  - Attendance UI patterns

  **Acceptance Criteria**:
  - [ ] Staff can mark attendance per day
  - [ ] Status persists

  **QA Scenarios**:
  - Mark attendance in admin, verify in DB

  **Commit**: YES (Wave 3)
  - Message: `feat: add attendance marking in admin`
  - Files: `apps/admin/src/app/roster/page.tsx`

---

- [x] 21. **Admin - Batch Assignment**

  **What to do**:
  - For multi-day courses, assign batch per day
  - UI to see all bookings for a batch
  - Staff can override batch assignment

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T8, T11

  **References**:
  - Assignment UI patterns

  **Acceptance Criteria**:
  - [ ] Staff can assign batch per day
  - [ ] View shows bookings per batch

  **QA Scenarios**:
  - Assign batch, verify in roster view

  **Commit**: YES (Wave 3)
  - Message: `feat: add batch assignment in admin`
  - Files: `apps/admin/src/app/roster/[date]/page.tsx`

---

- [x] 22. **Waiver Link Email Trigger**

  **What to do**:
  - When booking reaches "confirmed" status
  - Send email with waiver link (placeholder URL for now)
  - Track waiver_sent flag in booking

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 3, depends on T11, T19

  **References**:
  - Email trigger patterns

  **Acceptance Criteria**:
  - [ ] Waiver email sends on confirmation
  - [ ] Flag set in DB

  **QA Scenarios**:
  - Confirm booking, check for waiver email

  **Commit**: YES (Wave 3)
  - Message: `feat: add waiver link email trigger`
  - Files: `apps/api/src/services/email.ts`

---

- [x] 23. **Form Validation & Error Handling**

  **What to do**:
  - Client-side validation (required fields)
  - Server-side Zod validation
  - Error messages in form UI
  - Loading states

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Parallelization**: Wave 4, depends on T9, T10, T11

  **References**:
  - Form validation patterns

  **Acceptance Criteria**:
  - [ ] Validation errors show on form
  - [ ] Invalid submissions rejected by API

  **QA Scenarios**:
  - Submit empty form, verify errors
  - Send invalid data to API, verify 400

  **Commit**: YES (Wave 4)
  - Message: `feat: add form validation and error handling`
  - Files: `apps/web/src/app/booking/page.tsx`, `apps/api/src/routes/bookings.ts`

---

- [ ] 24. **Admin - Daily Roster View**

  **What to do**:
  - Calendar/date picker view
  - Show all bookings for selected date
  - Group by batch
  - Show attendance status per booking

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 4, depends on T13, T20, T21

  **References**:
  - Roster UI patterns

  **Acceptance Criteria**:
  - [ ] Date selector works
  - [ ] Roster shows bookings grouped by batch

  **QA Scenarios**:
  - Select date, verify roster displays correctly

  **Commit**: YES (Wave 4)
  - Message: `feat: add daily roster view in admin`
  - Files: `apps/admin/src/app/roster/page.tsx`

---

- [ ] 25. **Environment Config**

  **What to do**:
  - .env.example with all required variables
  - Database URL, Razorpay keys, WhatsApp tokens, Resend key
  - Documentation in comments

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 4, depends on T1

  **References**:
  - Env file patterns

  **Acceptance Criteria**:
  - [ ] .env.example exists
  - [ ] All required vars documented

  **QA Scenarios**:
  - Review .env.example completeness

  **Commit**: YES (Wave 4)
  - Message: `chore: add environment config example`
  - Files: `.env.example`

---

- [ ] 26. **Basic Mobile Styling**

  **What to do**:
  - Tailwind responsive classes
  - Mobile-first form design
  - Touch-friendly inputs
  - Readable on small screens

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []
  - **Parallelization**: Wave 4, depends on T9, T12

  **References**:
  - Mobile-first CSS patterns

  **Acceptance Criteria**:
  - [ ] Form usable on mobile (320px+)
  - [ ] Admin usable on tablet+

  **QA Scenarios**:
  - Resize browser to mobile width, verify form works

  **Commit**: YES (Wave 4)
  - Message: `style: add mobile-responsive styling`
  - Files: `apps/web/src/app/**/*.tsx`, `apps/admin/src/app/**/*.tsx`

---

- [ ] 27. **Deployment Documentation**

  **What to do**:
  - Docker Compose file (optional)
  - Single server deployment guide
  - Build commands
  - Environment setup

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Parallelization**: Wave 4, depends on T1, T4, T5, T6

  **References**:
  - Deployment docs

  **Acceptance Criteria**:
  - [ ] Dockerfile exists
  - [ ] Deployment steps documented

  **QA Scenarios**:
  - Review deployment docs

  **Commit**: YES (Wave 4)
  - Message: `docs: add deployment documentation`
  - Files: `Dockerfile`, `deploy.md`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — Verify all must-haves implemented, no scope creep

- [ ] F2. **Build Check** — `turbo run build` succeeds, no TypeScript errors

- [ ] F3. **Manual QA** — Walk through: booking form → payment → admin view → WhatsApp echo

---

## Commit Strategy

Wave 1: `chore: scaffold monorepo and shared packages`
Wave 2: `feat: add booking form and admin views`
Wave 3: `feat: add integrations (payments, WhatsApp, email)`
Wave 4: `feat: add validation and polish`
Wave FINAL: `chore: final verification and docs`

---

## Success Criteria

- [ ] All 3 apps run with `npm run dev`
- [ ] Booking form calculates correct price
- [ ] Staff can view and manage bookings in admin
- [ ] WhatsApp responds to incoming messages
- [ ] Payment link created on booking
- [ ] Webhook updates booking status
- [ ] Email sends on confirmation