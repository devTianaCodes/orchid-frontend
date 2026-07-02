# OrchidCare Frontend

Mobile-first React frontend for OrchidCare, an orchid encyclopedia and care guide.

The app lets users browse orchid profiles, search and filter care information, open detailed care pages, save local favorites, explore rare orchids, and read a general orchid care guide.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- npm

## Routes

- `/` - immersive home entry page.
- `/orchids` - browse, search, filter, paginate, and favorite orchids.
- `/orchids/orchid-detail-:slug` - orchid detail and care profile.
- `/favorites` - locally saved favorite orchids.
- `/rare-orchids` - rare orchid collection.
- `/care-guide` - beginner orchid care guide.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file if needed:

```bash
cp .env.example .env
```

The frontend expects the backend API at:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

Vite normally serves the app at:

```bash
http://localhost:5173
```

## Useful Scripts

```bash
npm run lint
npm run format:check
npm run build
```

Use `npm run build` before publishing or reviewing a final change.

## Notes

- Favorites are currently stored in browser `localStorage`.
- The backend must be running for orchid list, filter, and detail data.
- Login, synced favorites, personal orchid collections, notes, and reminders are planned later features.
