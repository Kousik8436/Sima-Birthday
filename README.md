# Our Little Universe

A personal birthday website — MERN stack (this step: React + Express scaffold; MongoDB and the AI chatbot come in later steps).

## Structure

```
our-little-universe/
├── client/     # React + Vite + Tailwind + Framer Motion
├── server/     # Express API
└── package.json
```

## Step 1: Run the scaffold

From the project root:

```bash
npm run install:all
npm run dev
```

This starts:
- Client at http://localhost:5173 (you should see "Scaffold is running ✓")
- Server at http://localhost:4000/api/health (should return `{"status":"ok"}`)

If `npm run dev` doesn't work on your machine, run them in two separate terminals instead:

```bash
# terminal 1
cd server && npm install && npm run dev

# terminal 2
cd client && npm install && npm run dev
```

## What's next

Step 2 will add the data model (memories, timeline, messages, open-when letters) and the real API routes.
