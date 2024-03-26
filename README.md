This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the Atom-Nextjs SDK locally

Navigate to `/packages/atom-nextjs` and host the package locally:

```bash
npm link
```

Then, navigate out, back into the root folder, and connect to the locally hosted package:

```bash
npm link atom-nextjs
```

Lastly, you can also restart your code editor as there is a common bug with code editors where it says that the package is not installed.

# Environment Variables

The following environment variables are used:

```bash
HASH_SALT="CONFIDENTIAL"
MONGO_DB_URI="CONFIDENTIAL"
ATOM_PROJECT_KEY="CONFIDENTIAL"
UPSTASH_REDIS_REST_URL="CONFIDENTIAL"
UPSTASH_REDIS_REST_TOKEN="CONFIDENTIAL"
# Can be either 'dev' or 'prod'
ENV="dev"
```
