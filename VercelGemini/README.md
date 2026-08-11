# Vercel + Gemini test

A tiny chat app that confirms your Vercel deployment can talk to Google's Gemini API.

## Why there's an /api folder

Unlike your Supabase anon key, the Gemini API key must **never** be visible in browser code — anyone could copy it and use up your quota. So `api/chat.js` acts as a middleman: your frontend calls your own `/api/chat` endpoint, and that serverless function (running on Vercel's servers, not the browser) calls Gemini using the key.

## Setup

1. **Get a Gemini API key** — go to https://aistudio.google.com, sign in, click "Get API key" > "Create API key". No credit card needed.
2. **Deploy to Vercel** — push this folder to a GitHub repo, import it in Vercel. Vercel automatically detects the `api/` folder and turns `chat.js` into a serverless endpoint at `/api/chat`.
3. **Add the environment variable** — in Vercel: Project Settings > Environment Variables > add `GEMINI_API_KEY` with your real key. Redeploy after adding it (Vercel doesn't pick up new env vars on already-built deployments).
4. Open your deployed URL, type a message, hit Send. If it works, you'll see Gemini's reply appear as a chat bubble.

## Testing locally (optional)

If you want to test before deploying, install the Vercel CLI:

```
npm install -g vercel
vercel dev
```

Create a `.env.local` file with `GEMINI_API_KEY=your_key_here` in the project root — `vercel dev` reads it automatically.

## Notes

- Model used: `gemini-2.5-flash` — free tier, fast, good enough for testing.
- Free tier limits are roughly 5-15 requests per minute and up to a few hundred per day, more than enough for this kind of testing.
- If you see "Server misconfigured: GEMINI_API_KEY not set" — the environment variable isn't set on Vercel, or you deployed before adding it (redeploy after adding).
