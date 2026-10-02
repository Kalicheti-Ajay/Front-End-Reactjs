# Cost Estimator

Existing React + Vite frontend with a separate Express/Mongoose API. Runtime project, user, and authentication data comes from MongoDB through the API.

## Requirements

- Node.js 20 or later
- MongoDB (local or hosted)

## Setup

1. In the project root, run `npm install` and copy `.env.example` to `.env`. Set `VITE_API_BASE_URL` if the API is not at `http://localhost:5000/api`.
2. In `backend/`, run `npm install`, copy `.env.example` to `.env`, and set a private `JWT_SECRET` and your MongoDB URI. Change `SEED_PASSWORD` before using the demo account.
3. Start MongoDB, then start the API with `npm run dev` from `backend/`.
4. Start Vite with `npm run dev` from the project root.

The safe seed process upserts the initial users and creates starter projects only when Projects is empty. Existing user/project changes are preserved on restart. The starter login email is `ajay@example.com`; its password is the backend `SEED_PASSWORD` (defaults to `ChangeMe123!` for local learning only).

## API

- `POST /api/auth/login` — returns a JWT and user profile.
- `GET /api/users` and `GET /api/users/:id` — authenticated user lookup.
- `GET /api/projects` and `GET /api/projects/:id` — authenticated project lookup, with owner populated.
- `POST /api/projects` — authenticated project creation; owner must reference an existing user.
- `DELETE /api/projects/demo/delete-all` — authenticated development/demo helper, disabled in production. It is intentionally absent from frontend routes and navigation.
- `GET /api/health` — API health check.

All API routes except login and health require a bearer token. The frontend stores that token in local storage and redirects on a 401. Frontend route protection is a user experience guard; real deployments must add backend authorization and stronger token storage/security controls.

Search is kept in the `q` query parameter. Login preserves the requested protected URL, including query string, and returns there after a successful sign-in. Invalid application paths render Page Not Found; valid item routes with missing records render an item-specific not-found state.
