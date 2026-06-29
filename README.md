# NextBoard_Sticky

A modern visual sticky-board app for organizing ideas, tasks and projects on an infinite canvas.

Built with **Next.js 15**, **React 19**, **ReactFlow**, **TipTap**, **MongoDB**, **NextAuth** and **Framer Motion**.

## Features

- 🗒️ **Sticky Note Cards** — rich text notes with TipTap editor
- ✅ **Todo Cards** — interactive checklists
- 🔗 **Link Cards** — smart URL previews
- 🖼️ **Image Cards** — upload or paste images
- 🔀 **Connections** — draw labelled edges between cards
- 💾 **Auto-save** — localStorage (15s) + database (2min)
- 🔐 **Google Auth** — secure sign-in via NextAuth + MongoDB adapter
- ✨ **Animations** — Framer Motion throughout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Canvas | ReactFlow 11 |
| Editor | TipTap 2 |
| Auth | NextAuth v4 + Google OAuth |
| Database | MongoDB (via MongoDB Atlas) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Environment Variables

```
MONGODB_URI=...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
GOOGLE_ID=...
GOOGLE_SECRET=...
```
