import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

if (!process.env.AUTH_SECRET) {
  throw new Error('AUTH_SECRET is not set')
}

const prodUrl = 'https://keepkey-template-v8.vercel.app'

export const authConfig: NextAuthOptions = {
  debug: true, // Enable debug logs
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Password',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication - replace with your actual auth logic
        if (credentials?.email === "user@keepkey.com" && credentials?.password === "123345") {
          return {
            id: "1",
            name: "KeepKey User",
            email: credentials.email,
          }
        }
        return null
      }
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/signup',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      }
    }
  },
  session: {
    strategy: 'jwt'
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
} 