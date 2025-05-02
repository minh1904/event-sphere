import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { findUserByEmail } from '../signin/route';
import { signInSchema } from '@/lib/zod';
import * as argon2 from 'argon2';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
('@db');

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/sign-in' },
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
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Lỗi xác thực:', error);
          return null;
        }
      },
    }),
  ],
});
