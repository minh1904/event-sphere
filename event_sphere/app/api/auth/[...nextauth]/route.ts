import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { findUserByEmail } from '../signin/route';
import { signInSchema } from '@/lib/zod';
import * as argon2 from 'argon2';
import * as schema from '@/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { VerifyEmail } from '../../verifyEmail/route';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    authenticatorsTable: schema.authenticators,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/sign-in' },
  callbacks: {
    jwt({ token, user }) {
      console.log('user la', user);
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (['google'].includes(account.provider)) {
        if (user.email) await VerifyEmail(user.email);
      }
    },
  },
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          const user = await findUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordValid = await argon2.verify(user.password, password);
          if (!passwordValid) return null;

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Lỗi xác thực:', error);
          return null;
        }
      },
    }),
  ],
});
