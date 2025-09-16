# Frontend

Made by Next.js written in TypeScript. Utilizes static site generation (SSG) and incremental static regeneration (ISR).

## Usage

- Create .env.local file with a URL to the API:
  ```
  NEXT_PUBLIC_STRAPI_API_URL=https://strapi.example.com
  NEXTAUTH_URL=https://example.com
  SECRET=secret
  ```
- `pnpm i` to install dependencies
- `pnpm run dev` for development.
- `pnpm run build` and `pnpm start` for production.

## Testing

WIP

## Dependencies

- nodejs ^22
- pnpm
