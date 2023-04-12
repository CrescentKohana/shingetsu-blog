import { withPlaiceholder } from "@plaiceholder/next"

export default withPlaiceholder({
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/i/:slug",
        destination: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/uploads/:slug",
      },
    ]
  },
  images: {
    domains: ["strapi.kohana.fi", "localhost"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
})
