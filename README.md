# cherryland

Headless Sanity website generated with TypeScript.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables and set your Sanity project values:

   ```bash
   cp .env.example .env
   ```

## Scripts

- `npm run build` - Compile TypeScript to `dist/`
- `npm run typecheck` - Run TypeScript checks without emitting files

## Project structure

- `src/sanity.config.ts` - Runtime Sanity configuration from environment
- `src/index.ts` - Headless Sanity client setup and HTML generation helpers
