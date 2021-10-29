module.exports = {
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
    domains: ["strapi.luukuton.fi"],
    formats: ["image/avif", "image/webp"],
  },
}
