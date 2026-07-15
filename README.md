# Pipeline CRM

> **Status:** MVP 1 — Feature-complete prototype. All core features implemented and working. Login removed for public testing — all pages freely accessible.

A multi-tenant SaaS CRM & sales pipeline platform for agencies and sales teams. Track leads, manage deals, and close more with visual Kanban pipeline views.

![Pipeline CRM](https://img.shields.io/badge/Built_with-Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **Visual Pipeline** — Drag-and-drop Kanban boards with custom stages
- **Contact Management** — Centralized contacts with company associations
- **Company Profiles** — Track organizations, industries, and relationships
- **Deal Tracking** — Full deal lifecycle from lead to close
- **Task Management** — Priority-based tasks with due dates and deal linking
- **Sales Analytics** — Revenue charts, pipeline funnel, win rates, source tracking
- **Activity Timeline** — Automatic logging across all deals and contacts
- **Notes System** — Rich notes linked to contacts and deals
- **Multi-Tenant Workspaces** — Organization-based isolation with role-based access
- **Premium UI** — Emerald green design system, noise textures, glass morphism, Plus Jakarta Sans typography

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Database:** SQLite via Prisma 7 + `@prisma/adapter-libsql`
- **Auth:** NextAuth.js v5 (Auth.js) with JWT sessions
- **Styling:** Tailwind CSS v4 + custom design tokens
- **Components:** Custom shadcn/ui components
- **Charts:** Recharts
- **Drag & Drop:** @dnd-kit
- **Fonts:** Plus Jakarta Sans + IBM Plex Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/yourusername/pipeline-crm.git
cd pipeline-crm
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
pipeline-crm/
├── prisma/              # Schema + SQLite database + seed
├── src/
│   ├── app/
│   │   ├── (auth)/      # Login, Register, Auth Error (split-screen layout)
│   │   ├── (dashboard)/ # Dashboard, Pipeline, Contacts, Companies, Deals, Tasks, Notes, Analytics, Settings
│   │   ├── api/         # REST API routes + NextAuth catch-all
│   │   ├── privacy/     # Privacy policy
│   │   ├── terms/       # Terms of service
│   │   └── contact/     # Contact page
│   ├── components/
│   │   ├── ui/          # 15+ shadcn components
│   │   ├── layout/      # Sidebar, Header, Dashboard Layout
│   │   └── pipeline/    # Kanban components
│   ├── lib/
│   │   ├── prisma.ts    # Prisma client (LibSQL adapter)
│   │   ├── auth.ts      # NextAuth v5 config
│   │   └── utils.ts     # Shared utilities
│   └── types/
├── public/
├── .env
├── .env.example
└── README.md
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth authentication |
| GET/POST | `/api/workspaces` | List/create workspaces |
| GET/POST | `/api/contacts` | List/create contacts |
| GET/POST | `/api/companies` | List/create companies |
| GET/POST | `/api/deals` | List/create deals |
| GET/POST | `/api/tasks` | List/create tasks |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features, how-it-works, pricing, testimonials |
| `/login` | Split-screen login with branded panel |
| `/register` | Split-screen registration |
| `/dashboard` | Stats cards, revenue charts, pipeline stages, recent deals, tasks |
| `/pipeline` | Drag-and-drop Kanban board with 6 stages |
| `/contacts` | Searchable contact list with avatars and tags |
| `/companies` | Company cards with stats (contacts, deals, revenue) |
| `/deals` | Sortable deal table with stage badges and priority |
| `/tasks` | Task list with priority filters and completion status |
| `/notes` | Notes grid with tags and contact/deal links |
| `/analytics` | Revenue vs target, pipeline funnel, source analysis |
| `/settings` | Profile, workspace, notifications, billing tabs |

## Design System

- **Font:** Plus Jakarta Sans (headings/body) + IBM Plex Mono (code)
- **Colors:** Emerald green palette (`#047857` primary light / `#34d399` dark)
- **Dark mode:** Deep forest background (`#0a1a15`) with emerald-tinted surfaces
- **Effects:** Noise texture, glass morphism, multi-layer card shadows, gradient text
- **Components:** `rounded-xl/2xl`, active scale micro-interactions, translucent badge fills

## License

MIT
