# Plane (Open-source Jira alternative) — Local Docker Setup + Frontend Connection

This guide uses Plane's official self-host Docker Compose flow.

## Prerequisites

- Docker installed and running
- Bash shell (Linux/macOS; for Windows use Git Bash or WSL)
- `curl` available

## 1) Create setup folder

```bash
mkdir -p plane-selfhost
cd plane-selfhost
```

## 2) Download Plane installer script

```bash
curl -fsSL -o setup.sh https://github.com/makeplane/plane/releases/latest/download/setup.sh
chmod +x setup.sh
```

## 3) Run installer and choose install

```bash
./setup.sh
```

- Choose action `1` (Install)
- This creates `plane-app/` (or `plane-app-preview/`) with `docker-compose.yaml` and `plane.env`

## 4) Configure Plane URL and CORS in `plane.env`

Set at minimum:

```bash
LISTEN_HTTP_PORT=8080
WEB_URL=http://localhost:8080
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 5) Start Plane services

```bash
./setup.sh
```

- Choose action `2` (Start)

Then open Plane at:

- http://localhost:8080

## 6) Connect this frontend to Plane-backed adapter

In this repository, create `.env.local`:

```bash
cp .env.example .env.local
```

Set values:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> Note: current frontend expects a project-specific API shape. If your Plane endpoints differ,
> keep fallback mode enabled and add a small adapter layer to map Plane API payloads to
> `DashboardData` in `src/types/domain.ts`.

## 7) Run frontend

```bash
npm install
npm run dev
```

Open:

- http://localhost:3000

## 8) Troubleshooting

- If port 8080 is already in use, pick another `LISTEN_HTTP_PORT` and update `WEB_URL`.
- If frontend remains in MOCK mode, verify `NEXT_PUBLIC_API_BASE_URL` and browser CORS.
- For Plane logs, run `./setup.sh` and choose `6` (View Logs).
