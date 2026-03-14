# Surf School Booking - Learnings

## 2026-03-14

### Monorepo Setup
- Turborepo 2.x uses `tasks` instead of `pipeline` in turbo.json
- Turbo installed as dev dependency at root
- Package.json workspaces configured for apps/* and packages/*
- Each app has its own package.json with appropriate scripts and port configs

### Files Created
- turbo.json - pipeline config with build, lint, dev, clean tasks
- package.json (root) - workspaces + turbo as devDependency
- apps/api/package.json - Express, port 4000
- apps/web/package.json - Next.js, port 3000  
- apps/admin/package.json - Next.js, port 3001
- packages/common/package.json - shared types
- packages/common/tsconfig.json - TypeScript config
- packages/common/src/index.ts - empty entry point

### Verification
- `npm install` - succeeds
- `turbo run build` - succeeds (all 4 packages)

### Prisma Setup (T7)
- Installed Prisma 6.x (v7 has breaking changes for schema config)
- `npm install prisma@6 @prisma/client@6` in apps/api
- Created prisma/schema.prisma with models: Booking, Course, StayOption, Property, Batch, Instructor
- Created BookingStatus enum (pending, confirmed, cancelled)
- Relations: Booking→Course, Booking→StayOption, Batch→Instructor, StayOption→Property
- Created singleton at apps/api/prisma.ts
- `npx prisma db push` created SQLite database at prisma/dev.db
- `npx prisma validate` - schema is valid
