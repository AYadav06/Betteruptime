# BetterUptime 🚀

A distributed, scalable website uptime monitoring and status tracking system built with **TypeScript**, **Express**, **Next.js**, **Prisma (PostgreSQL)**, and **Redis Streams**.

---

## 🌟 Overview

BetterUptime allows users to monitor the availability and performance of their websites. The system features a decoupled architecture where website check tasks are pushed to Redis Streams and processed by distributed workers operating across different geographical regions.

---

## 🏗️ Architecture & Workflow

```mermaid
flowchart TD
    User([User / Client]) <--> API[Express API Server]
    API <--> DB[(PostgreSQL / Prisma)]
    
    Pusher[Pusher Service] -->|Periodic Fetch| DB
    Pusher -->|Push Tasks| Redis[(Redis Stream: betteruptime:ticks)]
    
    subgraph Workers [Distributed Regional Workers]
        W1[Worker - US East]
        W2[Worker - EU Central]
        W3[Worker - AP South]
    end
    
    Redis -->|Consume Group| W1
    Redis -->|Consume Group| W2
    Redis -->|Consume Group| W3
    
    W1 -->|HTTP Ping| Target[Target Websites]
    W2 -->|HTTP Ping| Target
    W3 -->|HTTP Ping| Target
    
    W1 -->|Save Tick / Response Time| DB
    W2 -->|Save Tick / Response Time| DB
    W3 -->|Save Tick / Response Time| DB
```

1. **API Server**: Express backend handling user authentication (signup/signin) and website registration (`/api/v1/user`, `/api/v1/website`).
2. **Pusher Service**: Background cron service that periodically fetches tracked websites from PostgreSQL and publishes monitoring tasks to Redis Streams.
3. **Regional Worker Nodes**: Scalable consumer group workers deployed in various regions that pop tasks from Redis, ping target URLs, measure response times, and persist tick status (`Up` / `Down`) to the database.
4. **Client App**: Next.js 15 frontend providing dashboard interfaces and status metrics visualization.

---

## 🛠️ Tech Stack

- **Backend Runtime**: Bun / Node.js
- **API Framework**: Express.js
- **Database & ORM**: PostgreSQL & Prisma ORM
- **Task Queue & Pub/Sub**: Redis Streams (Consumer Groups)
- **HTTP Client**: Axios
- **Authentication**: JWT (JSON Web Tokens) & Cookie-Parser
- **Validation**: Zod
- **Frontend**: Next.js 15 (Turbopack, React 19, Tailwind CSS)

---

## 📁 Repository Structure

```text
Betteruptime/
├── backend/
│   ├── config/          # DB connection & Redis configuration
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Auth & validation middlewares
│   ├── prisma/          # Database schema & migrations
│   ├── pusher/          # Periodic Redis stream task producer
│   ├── routes/          # API route definitions
│   ├── src/             # Express API server entry point
│   ├── worker/          # Regional stream consumer worker
│   ├── .env.example     # Backend environment template
│   └── package.json
│
└── 
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2+) or Node.js (v20+)
- PostgreSQL instance
- Redis server instance

---

### Environment Setup

Create `.env` file inside `backend/`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/betteruptime
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
REGION_ID=your_region_uuid
WORKER_ID=worker_01
```

---

### Installation & Execution

#### 1. Database Setup
```bash
cd backend
bun install
bun prisma db push
```

#### 2. Start Backend API Server
```bash
cd backend
bun run dev
```

#### 3. Start Task Pusher
```bash
cd backend
bun run pusher/index.ts
```

#### 4. Start Regional Worker
```bash
cd backend
REGION_ID=<region_id> WORKER_ID=worker_1 bun run worker/index.ts
```

---

## 🔌 API Reference

### User Authentication
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/signin` - Authenticate user & issue JWT

### Website Management
- `POST /api/v1/website/add` - Add new website to monitor (Authenticated)
- `GET /api/v1/website/status/:id` - Fetch status & tick logs for a monitored website

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
