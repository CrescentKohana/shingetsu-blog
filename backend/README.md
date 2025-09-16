# Backend

Made with [Strapi](https://strapi.io).

## Usage

- Create a .env file:

  ```
  API_TOKEN_SALT=salt
  JWT_SECRET=secret
  ADMIN_JWT_SECRET=secret2
  HOST=0.0.0.0
  PORT=1337
  URL=https://strapi.example.org
  ```

- `pnpm i` to install dependencies
- `pnpm run develop` for development.
- `pnpm run build` and `pnpm start` for production.

## Dependencies

- nodejs ^22
- pnpm
