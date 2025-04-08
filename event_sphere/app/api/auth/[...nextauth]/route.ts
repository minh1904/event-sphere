import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { findUserByEmail } from '../signin/routes';
import { signInSchema } from '@/lib/zod';
import * as argon2 from 'argon2';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
          // Xác thực dữ liệu đầu vào bằng schema
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Tìm người dùng theo email
          const user = await findUserByEmail(email);

          // Nếu không tìm thấy user hoặc user không có mật khẩu, trả về null
          if (!user || !user.password) {
            return null;
          }

          // Xác thực mật khẩu
          const passwordValid = await argon2.verify(user.password, password);

          if (!passwordValid) {
            return null;
          }

          // Nếu mật khẩu hợp lệ, trả về thông tin user (không bao gồm mật khẩu)
          const { password: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.error('Lỗi xác thực:', error);
          return null;
        }
      },
    }),
  ],
});
