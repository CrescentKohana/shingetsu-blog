# Backend

Utlizes [Strapi](https://strapi.io).

## Usage

- Create a .env file:

  ```
  API_TOKEN_SALT=salt
  JWT_SECRET=secret
  ADMIN_JWT_SECRET=secret2
  HOST=0.0.0.0
  PORT=1337
  URL=https://vermillion.example.org
  ```

- `npm i` to install dependencies
- `npm run develop` for development.
- `npm run build` and `npm start` for production.

## Dependencies

- nodejs ^16.13.0
- npm ^8.1.2
