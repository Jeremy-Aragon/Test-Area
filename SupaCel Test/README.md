# Supabase + Vercel test

A tiny guestbook to confirm your Supabase database talks to your Vercel deployment.

## Setup

1. **Create the table** — In Supabase: SQL Editor > New Query > paste the contents of `setup.sql` > Run.
2. **Get your keys** — Project Settings > API > copy the Project URL and the `anon public` key.
3. **Add them to `index.html`** — replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` near the bottom of the file with your real values.
4. **Deploy to Vercel** — push this folder to a GitHub repo and import it in Vercel (or drag-and-drop deploy). No build settings needed, it's a static HTML file.
5. Open the deployed URL. The status dot at the top turns green if it connects. Post a message, refresh, it should still be there — confirms writes and reads both work.

## Notes

- This uses the `anon` public key directly in the HTML, which is safe *only* because Row Level Security policies control what that key can actually do. `setup.sql` sets it up so anyone can read and post — fine for a test, not for anything that needs real access control.
- No `.env` needed since this is plain HTML/JS, not Next.js — the keys just live in the file. If you rebuild this as a Next.js app later, move them into environment variables like you're used to with Vercel.
