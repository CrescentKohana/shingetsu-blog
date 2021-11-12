import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { getApiUrl } from "../../../lib/api"

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Senyougahara's secret",
      credentials: {
        token: { label: "Secret", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(getApiUrl(`/h?token=${credentials.token}`))

        if (res.ok) {
          return { name: credentials.token }
        }

        return null
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 90 * 24 * 60 * 60,
  },

  theme: "dark",
})
