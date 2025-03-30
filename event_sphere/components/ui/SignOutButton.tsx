// SignOutButton.tsx - Client Component
'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      className="w-full text-left cursor-pointer"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Đăng xuất
    </button>
  );
}
