# Frontend

Made by Next.js written in TypeScript. Utilizes static site generation (SSG) and incremental static regeneration (ISR).

## Usage

- Create .env.local file with a URL to the API:
  ```
  NEXT_PUBLIC_STRAPI_API_URL=https://strapi.example.com
  NEXTAUTH_URL=https://example.com
  SECRET=secret
  ```
- `npm i` to install dependencies
- `npm run dev` for development.
- `npm run build` and `npm start` for production.

## Testing

WIP

## Dependencies

- nodejs ^16.13.0
- npm ^8.1.2
