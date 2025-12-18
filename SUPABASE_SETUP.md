# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** Doctor Aldimir Mota
   - **Database Password:** (generate a strong password)
   - **Region:** Choose closest to your users
4. Wait 2-3 minutes for project creation

## 2. Create Database Table

### Option A: Using SQL Editor (Recommended)
1. In Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click "Run" or press Ctrl+Enter
5. Verify: Go to "Table Editor" → you should see the `citas` table

### Option B: Using Table Editor (Manual)
1. Go to Table Editor → New Table
2. Name: `citas`
3. Add columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `nombre` (varchar, required)
   - `telefono` (varchar, required)
   - `motivo` (text, required)
   - `fecha_creacion` (timestamptz, default: now())
   - `estado` (varchar, default: 'pendiente')
   - `notas` (text, nullable)
4. Enable RLS and create policies (see schema.sql)

## 3. Get API Credentials

1. In Supabase Dashboard → Settings → API
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API keys:**
     - `anon/public` key (for client-side)
     - `service_role` key (for server-side) ⚠️ Keep secret!

## 4. Configure Environment Variables

Create `.env.local` in project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Gemini AI (optional)
GEMINI_API_KEY=your-gemini-api-key

# NextAuth
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 5. Configure Netlify Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

| Key | Value | Notes |
|-----|-------|-------|
| `SUPABASE_URL` | `https://xxx.supabase.co` | From Supabase dashboard |
| `SUPABASE_ANON_KEY` | Your anon key | Safe to expose to client |
| `SUPABASE_SERVICE_KEY` | Your service role key | ⚠️ Keep secret! |
| `GEMINI_API_KEY` | Your Gemini key | Optional |
| `NEXTAUTH_SECRET` | Random string | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.netlify.app` | Your production URL |

## 6. Migrate Existing Data (Optional)

If you have data in `src/data/citas.json`:

1. Go to Supabase Dashboard → Table Editor → citas
2. Click "Insert" → "Insert row"
3. Manually copy data, or use this script:

```javascript
// Run this in browser console on your local dev server
const oldData = [/* paste your JSON data */];
for (const cita of oldData) {
  await fetch('/api/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: cita.nombre,
      telefono: cita.telefono,
      motivo: cita.motivo
    })
  });
}
```

## 7. Test the Connection

Run locally:
```bash
npm run dev
```

Test endpoints:
- Create: POST to `/api/citas` with form data
- List: GET to `/api/citas/list`
- Update: PATCH to `/api/citas/[id]`

## 8. Deploy to Netlify

```bash
git add .
git commit -m "feat: migrate to Supabase database"
git push
```

Netlify will auto-deploy. Check deployment logs for any errors.

## Security Best Practices

1. **Never commit .env.local** to git (already in .gitignore)
2. **Use service_role key only on server-side** (API routes)
3. **Use anon key for client-side** (if needed)
4. **Configure RLS policies** for production security
5. **Rotate keys** if accidentally exposed

## Troubleshooting

### "Failed to fetch" errors
- Check SUPABASE_URL is correct
- Verify API keys are set in environment variables
- Check Netlify build logs for missing env vars

### "relation does not exist"
- Run the schema.sql in Supabase SQL Editor
- Verify table name is exactly `citas` (lowercase)

### RLS Policy errors
- Disable RLS temporarily: `ALTER TABLE citas DISABLE ROW LEVEL SECURITY;`
- Or create proper policies for your auth setup

### Local development not connecting
- Create `.env.local` file in project root
- Restart dev server after adding env vars

## Next Steps

- ✅ Table created
- ✅ Environment variables configured
- ✅ Code updated to use Supabase
- 🔄 Test all CRUD operations
- 🔄 Deploy to production
- 📊 Set up database backups in Supabase
- 🔒 Configure stricter RLS policies (optional)
