'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';

type Props = {
  price: number | null;
  ticketLeft: number | null;
  productId: number;
};

const EventAction = ({ price, ticketLeft, productId }: Props) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (ticketLeft != null && quantity < ticketLeft) setQuantity(quantity + 1);
  };

  const handleAdd = async () => {
    if (!session?.user?.id) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/cart/add', {
        userId: session.user.id,
        productId,
        quantity,
      });

      toast.success(response.data.message || 'Thêm vào giỏ hàng thành công');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Lỗi khi thêm vào giỏ hàng');
      } else {
        toast.error('Lỗi không xác định khi thêm vào giỏ hàng');
      }
    } finally {
      setIsLoading(false);
    }
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
                disabled={quantity <= 1 || isLoading}
              >
                -
              </button>
              <span className="flex-1 flex items-center justify-center text-center">
                {quantity}
              </span>
              <button
                className="cursor-pointer w-10 h-full flex items-center justify-center bg-black text-white rounded-r-xl"
                onClick={handleIncrement}
                disabled={
                  isLoading || (ticketLeft != null && quantity >= ticketLeft)
                }
              >
                +
              </button>
            </div>
            <div className="ml-4 mt-1 text-xs">Còn lại {ticketLeft} vé</div>
          </div>
        </div>
        <div className="footer flex flex-col space-y-4">
          <div className="flex justify-between">
            <p>Tổng</p>
            <p className="font-bold text-xl">{totalPrice}đ</p>
          </div>
          <button
            className="w-56 h-10 bg-black text-white mx-auto flex justify-center rounded-xl items-center"
            disabled={isLoading}
          >
            Mua ngay
          </button>
          <button
            onClick={handleAdd}
            className="cursor-pointer w-56 h-10 bg-white text-black mx-auto flex justify-center rounded-xl border border-black items-center"
            disabled={isLoading}
          >
            {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventAction;
