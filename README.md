# PokePrice – Pokémon Card Collection Tracker

PokePrice is a full-stack web application that helps users track, analyze, and optimize their Pokémon Trading Card Game (TCG) collections. It provides real-time market price tracking, portfolio management, wishlist building, and anomaly detection for undervalued cards on eBay.

## Live Demo

* Production: [https://pokeprice-danishbir-singhs-projects.vercel.app](https://pokeprice-danishbir-singhs-projects.vercel.app)
* Preview: [https://pokeprice-git-main-danishbir-singhs-projects.vercel.app](https://pokeprice-git-main-danishbir-singhs-projects.vercel.app)

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Local Development](#local-development)
* [Deployment](#deployment)
* [Routes](#routes)
* [Troubleshooting](#troubleshooting)
* [Future Improvements](#future-improvements)
* [Author](#author)

## Features

* Market Price Tracking: fetch live market prices for cards (TCGPlayer/eBay).
* Personal Portfolio: track owned cards, graded values, and collection growth.
* Wishlist Management: save target cards and monitor price drops.
* Anomaly Detection: flag underpriced eBay listings in near real time.
* Authentication: Supabase Auth with Magic Link login.
* Cloud Deployment: frontend on Vercel, database on Supabase, background services on Heroku.

## Tech Stack

* Frontend: React (Next.js), Tailwind CSS
* Backend: Supabase (PostgreSQL, Auth, Realtime)
* Background/Data: Python for price ingestion and anomaly detection
* Hosting/CI: Vercel (frontend), Heroku (background workers), GitHub Actions (optional CI/CD)
* APIs: Supabase JS client, eBay/TCG APIs

## Project Structure

```
pokeprice/
├─ components/           # Reusable UI components
├─ pages/                # Next.js routes (e.g., /cards, /wishlist, /portfolio)
├─ utils/                # Helpers for pricing, auth, API calls
├─ supabase/             # SQL, types, RPCs
├─ anomaly/              # Python scripts (detector, data jobs)
├─ public/               # Static assets
├─ next.config.js        # Next.js configuration
├─ package.json
└─ README.md
```

## Getting Started

### Prerequisites

* Node.js 18+ and npm
* Python 3.9+ (for anomaly service)
* Supabase project with Postgres enabled
* Optional: Heroku account for background jobs

### Clone and Install

```bash
git clone https://github.com/your-username/pokeprice.git
cd pokeprice
npm install
```

## Environment Variables

Create a file named `.env.local` in the repository root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Third-party APIs
EBAY_API_KEY=your_ebay_key
```

Supabase dashboard settings (Authentication → URL Configuration):

* Site URL: set to your Vercel production URL, for example `https://pokeprice-danishbir-singhs-projects.vercel.app`
* Additional Redirect URLs: include both

  * `http://localhost:3000`
  * `https://pokeprice-danishbir-singhs-projects.vercel.app`
    If your app uses a specific callback path, also add `https://pokeprice-danishbir-singhs-projects.vercel.app/auth/callback`.

## Local Development

### Start the web app

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Run anomaly detection service (optional)

```bash
cd anomaly
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python detector.py
```

## Deployment

### Vercel (frontend)

1. Push your repo to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.local` in Vercel Project → Settings → Environment Variables.
4. Build command: `npm run build`
   Output directory: `.next`
   Framework preset: Next.js
5. Set Production Branch to `main`.

### Heroku (background services)

1. Create a new Heroku app.
2. Set environment variables used by `anomaly/` scripts.
3. Deploy the `anomaly/` directory as a worker or run it as a one-off dyno.

### Supabase (database and auth)

* Create tables and policies as needed.
* Confirm Site URL and Redirect URLs as noted above to avoid magic-link redirecting to localhost in production.

## Routes

* `/cards`: view, filter, and search cards with live prices
* `/portfolio`: track owned cards and total portfolio value
* `/wishlist`: manage target cards and receive drop alerts

If you want the root URL to open `/cards`, add this to `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/cards', permanent: false }];
  },
};
module.exports = nextConfig;
```

## Troubleshooting

* Magic Link opens localhost in production

  * Set Supabase Authentication → Site URL to your Vercel domain.
  * Add your production URL to Additional Redirect URLs.
* App home page shows a placeholder instead of your cards page

  * Add the redirect from `/` to `/cards` as shown above.
* 401 or unauthorized API calls

  * Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in both `.env.local` and Vercel project settings.

## Future Improvements

* Price prediction models for forecasting card values
* Mobile app (React Native)
* Discord bot for price alerts and watchlist updates

## Author

Developed by Danishbir Singh Bhatti
Master’s in Software Engineering, San Jose State University
