// components/Cart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import { useAtom } from 'jotai';
import CounterButton from './CounterButton';
import { isCartOpenAtom } from '@/app/state/CartContext';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: string;
  title: string;
  type: string | null;
  imageUrl: string | null;
}

const Cart = () => {
  const [openCart, setIsOpenCart] = useAtom(isCartOpenAtom);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (openCart) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch('/api/cart');
          const data = await response.json();
          if (response.ok) {
            setCartItems(data);
          } else {
            console.error('Error fetching cart:', data.error);
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [openCart]);

  const onHandle = () => {
    setIsOpenCart(!openCart);
  };

  // Tính tổng giá
  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div
      className={`fixed right-1 z-10 top-15 md:right-20 w-[420px] h-[450px] bg-white rounded-[3px] px-5 ${!openCart ? 'hidden' : ''}`}
    >
      <div className="header-title flex justify-between pt-4 font-bold">
        <p>Giỏ hàng</p>
        <div onClick={onHandle}>
          <CloseIcon className="cursor-pointer" />
        </div>
      </div>
      <div className="middle h-[320px] overflow-scroll overflow-x-hidden">
        {loading ? (
          <p className="text-center">Đang tải. ..</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">Giỏ hàng trống</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="product">
              <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
              <div className="product-item flex gap-2 mt-3">
                <Image
                  src={item.imageUrl || '/imgs/default.jpg'}
                  width={100}
                  height={100}
                  quality={100}
                  className="w-20 h-20 flex-shrink-0"
                  alt={item.title}
                />
                <div className="product-info flex-1 space-y-2 h-full">
                  <div className="product-name flex justify-between">
                    <h3>{item.title}</h3>
                    <p>{Number(item.price).toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="product-type">
                    <p>{item.type || 'Thường'}</p>
                  </div>
                  <div className="product-footer flex justify-between">
                    <DeleteForeverIcon /> <span>Xoá</span>
                    <CounterButton quantity={item.quantity} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-5">
        <div className="w-full bg-gray-300 h-[1px] mt-3"></div>
        <div className="flex justify-between mt-5 font-bold">
          <p>Tổng</p>
          <p>{totalPrice.toLocaleString('vi-VN')}đ</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
