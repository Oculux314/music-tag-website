# Music Tag

Music Tag is a TypeScript monorepo with a React/Vite frontend, an Express API, shared TypeScript types, and a PostgreSQL database managed with Drizzle ORM.

## Requirements

- Node.js 22.12 or newer
- Yarn 4.18.1 (pinned in the root `package.json`)
- Docker Compose (for the local PostgreSQL database or the full container stack)

## VS Code

Yarn is configured to install dependencies into local `node_modules` directories. Open the repository root in VS Code; the TypeScript, Oxlint, and Oxfmt extensions can resolve their workspace dependencies directly.

## Local development

The local `backend/.env` and `frontend/.env` files are ignored by Git. Create them from the committed examples when setting up a fresh checkout:

```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Formatting and linting

Use Oxlint to apply safe automatic fixes, or run it without changes. Use Oxfmt to format the repository or check formatting without changing files:

```sh
yarn lint
yarn lint:check
yarn format
yarn format:check
```

Start PostgreSQL, install dependencies, then start both apps from the repository root:

```sh
docker compose up -d db
yarn install
yarn dev
```

- Frontend: <http://localhost:5173>
- API health endpoint: <http://localhost:4000/api/health>
- PostgreSQL: `localhost:5432`

`yarn dev` builds the shared TypeScript project, then starts Vite and the API together. The root TypeScript solution config references the shared, backend, and frontend projects, so `yarn tsc -b` builds and type-checks them from the repository root.

## Build and run

```sh
yarn build
yarn start
```

The frontend preview server listens on port `8080` when started with `yarn start`. The API listens on port `4000`.

## Drizzle migrations

The backend schema is in `backend/src/db/schema.ts`; Drizzle Kit reads `backend/drizzle.config.ts` and writes migrations to `backend/drizzle`.

```sh
yarn workspace @music-tag/backend db:generate
yarn workspace @music-tag/backend db:migrate
```

## Docker Compose

Build and start the frontend, API, and local PostgreSQL containers for development:

```sh
docker compose up --build
```

- Frontend: <http://localhost:8080>
- API: <http://localhost:4000/api/health>

Compose uses a development-only PostgreSQL username and password. The backend connects to it through `DB_URL`. To use Neon, set `DB_URL` in the deployment environment or the root Compose `.env` file to the connection string from your Neon project, for example `DB_URL=postgresql://user:password@host/dbname?sslmode=require`. The frontend's `VITE_BACKEND_URL` is injected as a Docker build argument; set it in the shell if the API is served from a different public URL.

## Environment variables

The backend loads `backend/.env` itself, independent of the current working directory, then validates `NODE_ENV`, `PORT`, `DB_URL`, and `CORS_ORIGIN` with Zod in `backend/src/env.ts`. Local development uses the Compose PostgreSQL service; a deployed server can use Neon with the same `pg` driver and `DB_URL` variable.

Vite loads `frontend/.env`. Browser-visible values need the `VITE_` prefix, so the API URL is `VITE_BACKEND_URL`. This value is public and is embedded into the frontend bundle.
