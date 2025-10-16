# 🧩 Realtime Collaborative Task Board

A full-stack web application for managing tasks collaboratively in real time.
Built with **React (TypeScript)**, **Node.js (Express + TypeScript)**, **PostgreSQL**, **Kafka**, and **Docker**.

**Key Features:**

- 🧠 Authentication (JWT)
- 📋 Boards, lists, and tasks (CRUD)
- 🔁 Real-time updates via WebSocket + Kafka events
- ⚙️ Background workers (Redis)
- 🐳 Fully Dockerized environment (frontend, backend, Kafka, Postgres, Redis)
- 🧪 CI/CD ready (GitHub Actions)
- 📊 Optional metrics and observability setup

## 🐳 Quick Start (Development)

### 1️⃣ Prerequisites

- Docker & Docker Compose installed
- Node.js (v20+) and npm (for local dev, optional)

### 2️⃣ Start the stack

```bash
docker-compose -f docker-compose.dev.yml up --build
```
