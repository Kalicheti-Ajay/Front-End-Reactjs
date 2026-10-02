# Front-End-Reactjs

This repository contains two separate apps:

- Frontend: Front End/Cost-Estimator
- Backend: Back End

## Project structure

Front End/
  Cost-Estimator/
    src/
    public/
    package.json
    .env
    .env.example

Back End/
  src/
  package.json
  .env
  .env.example

## Run the frontend

Open a terminal and run:

cd "C:\Development\workspace\Front-End-Reactjs\Front End\Cost-Estimator"
npm install
npm run dev

The app runs on http://localhost:5173

## Run the backend

Open a second terminal and run:

cd "C:\Development\workspace\Front-End-Reactjs\Back End"
npm install
npm run dev

The API runs on http://localhost:5000

## Environment variables

Frontend .env:

VITE_API_BASE_URL=http://localhost:5000/api

Backend .env:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cost_estimator
JWT_SECRET=your-development-secret
CLIENT_ORIGIN=http://localhost:5173
SEED_PASSWORD=ChangeMe123!

Keep the frontend and backend .env files separate. Do not put backend secrets in the frontend app.
