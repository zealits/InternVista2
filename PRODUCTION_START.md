# Production Startup Guide

## Complete Production Workflow

### 1. Build Everything
```bash
pnpm build
```
This builds:
- ✅ Frontend (React) → `dist/apps/client/`
- ✅ Backend (NestJS) → `dist/apps/server/`
- ✅ All libraries → `dist/libs/`

### 2. Start Production Server
```bash
pnpm start
```

The server will:
- Run database migrations automatically
- Start on port 3000 (or PORT from .env)
- Serve the optimized frontend with all performance optimizations

## Environment Setup

Make sure your `.env` file has:
- Database connection string
- PORT (defaults to 3000)
- Other required environment variables

## What Gets Optimized

✅ **Frontend Build:**
- Minified JavaScript & CSS
- Code splitting for better caching
- No sourcemaps (smaller bundles)
- Optimized asset organization

✅ **Server:**
- Gzip compression enabled
- Proper cache headers for static assets
- 1-year cache for JS/CSS/images
- No cache for HTML (SPA routing)

## Access Points

- **Frontend:** `http://localhost:3000/`
- **API:** `http://localhost:3000/api/`
- **API Docs:** `http://localhost:3000/api/docs`

## Development vs Production

**Development:**
```bash
pnpm dev
```

**Production:**
```bash
pnpm build
pnpm start
```



