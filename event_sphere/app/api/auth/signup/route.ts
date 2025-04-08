import * as argon2 from 'argon2';
import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  if (!validateEmailRegex.test(email)) {
    return NextResponse.json(
      { message: 'Email không hợp lệ' },
      { status: 400 }
    );
  }
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Hãy điền tất cả' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: 'Mật khẩu tối thiểu 6 kí tự' },
      { status: 400 }
    );
  }

  try {
    const existingUser = (
      await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1)
    )[0];
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email đã tồn tại' },
        { status: 400 }
      );
    }
    const hashedPassword = await argon2.hash(password);
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });
    return NextResponse.json(
      { message: 'Tạo tài khoản thành công' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Có lỗi xảy ra', error },
      { status: 500 }
    );
  }
}
