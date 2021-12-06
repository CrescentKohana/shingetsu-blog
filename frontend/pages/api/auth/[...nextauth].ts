import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getApiUrl } from "../../../lib/api"

export default NextAuth({
  providers: [
    Credentials({
      name: "Arararagi",
      credentials: {
        token: { label: "Secret", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const res = await fetch(getApiUrl(`/ecchi?token=${credentials.token}`))
        if (res.ok) {
          return { name: credentials.token }
        }

        return null
      },
    }),
  ],

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },

  theme: {
    colorScheme: "dark",
    brandColor: "#4B76D9",
    logo: "/暦.svg",
  },
})
