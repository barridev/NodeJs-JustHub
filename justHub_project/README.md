# Getting started

Create two files:
- `.env.dev`
- `.env.test`

These two files are private and will contain your environment variable for Database connection and JWT signature.

The should contain the following values (update with your own values). See `.template.env` for example.
```
JWT_SECRET=verysecretkey
SUPABASE_URL=https://<...>.supabase.co
SUPABASE_KEY=eyJhbciOJIU....

```
