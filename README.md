# Testing Agent Frontend MVP

A Next.js + TypeScript frontend MVP for the Testing Agent experience.

This app demonstrates:
- PRD ingestion flow
- Generated test list + rationale
- Run execution summary (stable pass/fail/flaky)
- Explain-everything RCA panel
- Findings table
- Run history panel
- Live API mode with automatic mock fallback

---

## 1) Prerequisites

Install the following on your machine:

- **Node.js**: 20.x or later
- **npm**: 10.x or later

Check versions:

```bash
node -v
npm -v
```

---

## 2) Clone and enter the project

```bash
git clone <your-repo-url>
cd CodexRepo
```

---

## 3) Install dependencies

```bash
npm install
```

This installs Next.js, React, TypeScript, and lint tooling from `package.json`.

---

## 4) Configure environment (optional for first run)

Create a local env file:

```bash
cp .env.example .env.local
```

If `.env.example` is not present, create `.env.local` manually:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### How data mode works

- If `NEXT_PUBLIC_API_BASE_URL` is set and reachable, the app uses **LIVE** API mode.
- If not set / unavailable, the app automatically falls back to **MOCK** mode.

---

## 5) First run (development)

Start the dev server:

```bash
npm run dev
```

Open:

- http://localhost:3000

You should see:

- Dashboard title: **Testing Agent MVP**
- Data source badge (LIVE or MOCK)
- Requirement ingestion area
- Generated tests table
- Run summary + RCA
- Findings + run history + integrations/pricing

---

## 6) Verify project health

Type-check:

```bash
tsc --noEmit
```

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
npm run start
```

Open:

- http://localhost:3000

---

## 7) Step-by-step usage guide (UI)

1. **Ingest PRD**
   - Paste a user story into the PRD textarea.
   - Click **Ingest PRD**.
   - A new requirement row is added.

2. **Generate tests**
   - Click **Generate Tests** in the generated tests panel.
   - New generated test rows appear with rationale.

3. **Inspect RCA**
   - Click **View** in any test row.
   - RCA panel updates with failure/root-cause/evidence/action.

4. **Run suite**
   - Click **Run Suite** in run summary panel.
   - KPI values update.
   - A new entry is added under **Recent Runs**.

5. **Check data source mode**
   - Top status area shows LIVE or MOCK and fallback reason if applicable.

---

## 8) Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/dashboard/
    index.tsx
    requirement-upload-card.tsx
    requirements-table.tsx
    generated-tests-table.tsx
    run-summary-panel.tsx
    rca-panel.tsx
    findings-table.tsx
    run-history-list.tsx
    integrations-pricing.tsx
  lib/
    api.ts
    dataSource.ts
    mockApi.ts
  types/
    domain.ts
    shims.d.ts
```

---

## 9) Troubleshooting

### `npm install` fails with registry/network errors

- Verify internet and npm registry access:
  ```bash
  npm config get registry
  ```
- You can set registry explicitly:
  ```bash
  npm config set registry https://registry.npmjs.org/
  ```
- If your org uses an internal mirror, use that mirror URL.

### App always shows MOCK mode

- Confirm `NEXT_PUBLIC_API_BASE_URL` is set in `.env.local`.
- Confirm backend endpoint availability and CORS settings.

### Port 3000 already in use

```bash
npm run dev -- -p 3001
```

Then open `http://localhost:3001`.

---

## 10) Next recommended improvements

- Replace `mockApi.ts` flows endpoint-by-endpoint with live backend responses.
- Add component/unit tests for ingest/generate/run/RCA interactions.
- Add CI pipeline for `tsc --noEmit`, lint, and tests.

---

## 11) Plane (Open-source Jira alternative) setup + connection

If you want to test with **Plane** as a Jira-like tool:

1. Follow the full step-by-step Docker guide in:
   - `docs/PLANE_SETUP.md`
2. Start Plane locally on port `8080`.
3. Set frontend `.env.local`:
   - `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
4. Run frontend:
   - `npm run dev`

The app will try LIVE mode first and fallback to MOCK mode automatically when API shape/auth is not yet aligned.
