'use server';
import DecryptedText from './DecryptedText/DecryptedText';
import DropdownUser from '@/components/DropdownUser';

import { auth } from '@/auth';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import CartToggle from './cartToggle';

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="z-9999 w-full flex justify-between items-center py-2 md:px-8 fixed top-0 left-0 bg-amber-50">
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

      <ul className="flex items-center text-center uppercase gap-2 ">
        <li className=" block">
          <Link href="/">
            <DecryptedText text="Trang chủ" />
          </Link>
        </li>

        <li className=" block ">
          <Link href="/about">
            <DecryptedText text="Giới thiệu" />
          </Link>
        </li>

        <li className=" block ">
          <Link href="/contact">
            <DecryptedText text="Liên hệ" />
          </Link>
        </li>
      </ul>

      <div>
        {session && session?.user ? (
          <div className="space-x-1.5 flex items-center">
            <CartToggle />
            <DropdownUser />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <LocalMallSharpIcon
              className="cursor-pointer mb-0.5"
              sx={{ fontSize: 35 }}
            />
            <Link href="/sign-in">Đăng nhập</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
