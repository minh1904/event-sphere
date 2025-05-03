import type { JWT as DefaultJWT } from 'next-auth/jwt';
import type { User as DefaultUser } from 'next-auth';
import { users } from '@/db/schema';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: (typeof users.$inferSelect)['role'];
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
      // Thêm các thuộc tính khác nếu có
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: (typeof users.$inferSelect)['id'];
    role: (typeof users.$inferSelect)['role'];
    email: string;
    name: string;
  }
}
