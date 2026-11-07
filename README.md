# LetsMeatup

Find when the whole crew can meat up. Phase 0: Google sign-in showing your display name.

Stack: Next.js 16 (App Router), Auth.js (`next-auth@beta`, v5), Tailwind. JWT sessions, no database.

## Google Cloud setup (manual)

1. Go to https://console.cloud.google.com and create a new project.
2. APIs & Services > OAuth consent screen: User type **External**, publishing status **Testing**. Add your Google accounts under **Test users**. Add scopes `openid` and `profile`.
3. APIs & Services > Credentials > Create credentials > OAuth client ID > Application type **Web application**.
4. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://<vercel-domain>/api/auth/callback/google`
5. Copy the client ID and secret.

## Local run

```bash
npm install
cp .env.example .env.local
npx auth secret   # generates AUTH_SECRET (or: openssl rand -base64 33)
# fill AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET in .env.local
npm run dev
```

Open http://localhost:3000.

## Vercel deploy

1. Push the repo to GitHub, then import it in Vercel.
2. Set env vars `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`.
3. Deploy, then add `https://<your-vercel-domain>/api/auth/callback/google` to the Google client's authorized redirect URIs.

Auth.js detects the Vercel host automatically; no `trustHost` setting is needed.

## Notes

- Testing mode limits the app to 100 test users, and refresh tokens expire after 7 days (matters from Phase 2, calendar access).
