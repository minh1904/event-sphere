'use server';

import { auth } from '@/auth';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="w-full flex justify-between items-center p-4 md:px-8">
      <Link href="/about" className="flex items-center space-x-2 ">
        <Image
          src="/imgs/Logo.png"
          alt="logo"
          width={20}
          height={20}
          className="w-8 h-8"
        />
        <div className="gap-0.5">
          <p>EVENT</p>
          <p>SPHERE®</p>
        </div>
      </Link>

      <div className="space-x-1.5">
        <Link href="/" className="uppercase hover:">
          Trang chủ
        </Link>
        <Link href="/about" className="uppercase">
          giới Thiệu
        </Link>
        <Link href="/contact" className="uppercase">
          Liên hệ
        </Link>
      </div>

      <div>
        {session && session?.user ? (
          <div className="space-x-1.5 flex items-center">
            <LocalMallSharpIcon
              className="cursor-pointer mb-0.5"
              sx={{ fontSize: 35 }}
            />
            <AccountCircleSharpIcon
              className="cursor-pointer"
              sx={{ fontSize: 35 }}
            />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <LocalMallSharpIcon />
            <Link href="/sign-in">Đăng nhập</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
