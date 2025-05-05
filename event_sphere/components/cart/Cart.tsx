'use client';

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

const fetchCartItems = async () => {
  const res = await axios.get('/api/cart');
  return res.data;
};

const Cart = () => {
  const [openCart, setIsOpenCart] = useAtom(isCartOpenAtom);

  const deleteItem = useMutation({
    mutationFn: async (productId: number) => {
      return axios.delete(`/api/cart/update?productId=${productId}`);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const {
    data: cartItems = [],
    isLoading,
    refetch,
  } = useQuery<CartItem[]>({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
    enabled: openCart,
    refetchOnMount: true,
  });

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onHandle = () => setIsOpenCart(false);

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
        {isLoading ? (
          <p className="text-center">Đang tải...</p>
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
                    <DeleteForeverIcon
                      onClick={() => deleteItem.mutate(item.productId)}
                      className="cursor-pointer"
                    />

                    <CounterButton
                      quantity={item.quantity}
                      productId={item.productId}
                      onQuantityChange={() => refetch()}
                    />
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
