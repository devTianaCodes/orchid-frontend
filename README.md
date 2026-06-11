# OrchidCare Frontend

Mobile-first frontend for OrchidCare, an orchid encyclopedia web app.

This repository contains the React, Vite, TypeScript, and Tailwind CSS application shell for browsing orchids, searching and filtering care information, opening detailed care pages, and saving local favorites.

## Planned Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- npm

## Planned MVP Routes

- `/` - browse, search, and filter orchids
- `/orchids/:slug` - orchid detail and care guide
- `/favorites` - locally saved favorite orchids

## Current Status

This is a project bootstrap scaffold. The app shell can run, but the real orchid browsing features are still planned work.

## Local Setup

```bash
npm install
npm run dev
```

The frontend expects the backend API at:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```
