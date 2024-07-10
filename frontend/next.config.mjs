import { withPlaiceholder } from "@plaiceholder/next"

export default withPlaiceholder({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/i/:slug",
        destination: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/uploads/:slug",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.kohana.fi",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
})
