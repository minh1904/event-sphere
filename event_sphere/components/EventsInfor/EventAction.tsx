'use client';

import { useState } from 'react';

type Props = {
  price: number | null;
};

const EventAction = ({ price }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Tính tổng giá
  const totalPrice =
    price !== null
      ? new Intl.NumberFormat('vi-VN').format(price * quantity)
      : 'N/A';

  return (
    <div className="hidden xl:block fixed top-31 right-8 w-72 h-96 bg-white p-5 rounded-[5px]">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">Số Lượng</div>
          <div className="quanity-block mt-5">
            <div className="w-56 h-10 bg-white mx-auto flex justify-between rounded-xl border border-black items-center">
              <button
                className="cursor-pointer w-10 h-full flex items-center justify-center bg-black text-white rounded-l-xl"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center text-center">
                {quantity}
              </span>
              <button
                className="cursor-pointer w-10 h-full flex items-center justify-center bg-black text-white rounded-r-xl"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <div className="ml-4 mt-1 text-xs">Còn lại 15 vé</div>
          </div>
        </div>
        <div className="footer flex flex-col space-y-4">
          <div className="flex justify-between">
            <p>Tổng</p>
            <p className="font-bold text-xl">{totalPrice}đ</p>
          </div>
          <button className="w-56 h-10 bg-black text-white mx-auto flex justify-center rounded-xl items-center">
            Mua ngay
          </button>
          <button className="w-56 h-10 bg-white text-black mx-auto flex justify-center rounded-xl border border-black items-center">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventAction;
