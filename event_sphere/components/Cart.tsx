'use client';

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import CounterButton from './CounterButton';
import { useAtom } from 'jotai';
import { isCartOpenAtom } from '@/app/state/CartContext';

const Cart = () => {
  const [openCart, setIsOpenCart] = useAtom(isCartOpenAtom);

  const onHandle = () => {
    setIsOpenCart(!openCart);
  };
  return (
    <div
      className={`fixed top-15 right-20 w-[420px] h-[450px] bg-white rounded-[3px] px-5 ${!openCart ? 'hidden' : ''}  `}
    >
      <div className="header-title flex justify-between pt-4 font-bold">
        <p>Giỏ hàng</p>
        <div onClick={onHandle}>
          <CloseIcon className="cursor-pointer" />
        </div>
      </div>
      <div className="middle h-[320px] overflow-scroll overflow-x-hidden">
        {' '}
        <div className="product ">
          <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
          <div className="product-item flex gap-2 mt-3">
            <Image
              src="/imgs/ev1.jpg"
              width={100}
              height={100}
              quality={100}
              className="w-20 h-20 flex-shrink-0"
              alt="img"
            ></Image>
            <div className="product-info flex-1 space-y-2 h-full">
              <div className="product-name flex justify-between">
                <h3>Quản lý nhân sự</h3>
                <p>300.000đ</p>
              </div>
              <div className="product-type">
                <p>Thường</p>
              </div>
              <div className="product-footer flex justify-between">
                <DeleteForeverIcon />
                <CounterButton />
              </div>
            </div>
          </div>
        </div>
        <div className="product">
          <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
          <div className="product-item flex gap-2 mt-3">
            <Image
              src="/imgs/ev1.jpg"
              width={100}
              height={100}
              quality={100}
              className="w-20 h-20 flex-shrink-0"
              alt="img"
            ></Image>
            <div className="product-info flex-1 space-y-2 h-full">
              <div className="product-name flex justify-between">
                <h3>Quản lý nhân sự</h3>
                <p>300.000đ</p>
              </div>
              <div className="product-type">
                <p>Thường</p>
              </div>
              <div className="product-footer flex justify-between">
                <DeleteForeverIcon />
                <CounterButton />
              </div>
            </div>
          </div>
        </div>
        <div className="product">
          <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
          <div className="product-item flex gap-2 mt-3">
            <Image
              src="/imgs/ev1.jpg"
              width={100}
              height={100}
              quality={100}
              className="w-20 h-20 flex-shrink-0"
              alt="img"
            ></Image>
            <div className="product-info flex-1 space-y-2 h-full">
              <div className="product-name flex justify-between">
                <h3>Quản lý nhân sự</h3>
                <p>300.000đ</p>
              </div>
              <div className="product-type">
                <p>Thường</p>
              </div>
              <div className="product-footer flex justify-between">
                <DeleteForeverIcon />
                <CounterButton />
              </div>
            </div>
          </div>
        </div>
        <div className="product">
          <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
          <div className="product-item flex gap-2 mt-3">
            <Image
              src="/imgs/ev1.jpg"
              width={100}
              height={100}
              quality={100}
              className="w-20 h-20 flex-shrink-0"
              alt="img"
            ></Image>
            <div className="product-info flex-1 space-y-2 h-full">
              <div className="product-name flex justify-between">
                <h3>Quản lý nhân sự</h3>
                <p>300.000đ</p>
              </div>
              <div className="product-type">
                <p>Thường</p>
              </div>
              <div className="product-footer flex justify-between">
                <DeleteForeverIcon />
                <CounterButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
        <div
          className="flex
        justify-between mt-5 font-bold"
        >
          <p>Tổng</p>
          <p>1.500.000đ</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
