# Database Baseline Guide

## Problem
Your production database already has tables, but Prisma doesn't know which migrations have been applied.

## Solution: Baseline the Database

### Step 1: Check Current Database State
First, verify your database has the expected schema. Connect to your database and check if:
- `User` table exists
- `Secrets` table exists  
- `Resume` table exists
- `Secrets.verificationTokenExpire` column exists (from the second migration)

### Step 2: Mark Migrations as Applied

If your database schema matches the current Prisma schema, mark all migrations as applied:

```bash
# Mark the first migration as applied
pnpm exec prisma migrate resolve --applied 20231121234455_initialize_tables

# Mark the second migration as applied (if verificationTokenExpire column exists)
pnpm exec prisma migrate resolve --applied 20251206130928_add_verification_token_expire
```

### Step 3: Verify
Check migration status:
```bash
pnpm exec prisma migrate status
```

### Step 4: Start Server
Now you can start the server:
```bash
pnpm start
```

## Alternative: Skip Migration Check (Not Recommended)

If you're absolutely sure your database is up-to-date and matches the schema, you can modify the start script to skip migrations. However, this is NOT recommended for production as it can cause issues.

## Important Notes

⚠️ **Only baseline if your database schema matches the Prisma schema exactly!**

If your database is missing columns or tables, you'll need to:
1. Manually apply missing migrations, OR
2. Use `prisma db push` to sync (development only), OR  
3. Create a new migration to add missing changes

