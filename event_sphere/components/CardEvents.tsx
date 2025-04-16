import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';

interface CardEventsProps {
  id: number;
  ticketLeft: number;
  imageUrl: string;
  type: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  isFree: boolean;
}

const CardEvents: React.FC<CardEventsProps> = ({
  id,
  ticketLeft,
  imageUrl,
  type,
  title,
  description,
  endTime,
  startTime,
  dateStart,
  dateEnd,
  price,
  isFree,
}) => {
  // Hàm format ngày
  const formatDate = (date: string): string => {
    try {
      return format(new Date(date), 'dd/MM/yy');
    } catch {
      return date; // Trả về nguyên gốc nếu lỗi
    }
  };

  // Hàm format giờ
  const formatTime = (time: string): string => {
    try {
      // Giả sử time có dạng "HH:mm:ss" hoặc "HH:mm"
      return format(new Date(`1970-01-01T${time}`), 'HH:mm');
    } catch {
      return time; // Trả về nguyên gốc nếu lỗi
    }
  };

  // Format dữ liệu
  const formattedDateStart = formatDate(dateStart);
  const formattedDateEnd = formatDate(dateEnd);
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <div className="h-[500px] bg-[#ECDCC1] flex flex-col shadow-triple group overflow-hidden transition-all duration-300">
      <p className="py-2 text-center">{ticketLeft} vé còn lại</p>
      {/* Ảnh */}
      <div className="relative w-full h-64 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="logo"
            fill
            quality={100}
            className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>Không có ảnh</span>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-1 px-4">
        <p className="text-gray-700 uppercase">{type}</p>
        <Link href={`/post/${id}`} className="text-2xl uppercase font-bold">
          {title}
        </Link>

        <p className="text-gray-700">{description}</p>
      </div>

      <div className="flex justify-between mt-auto pb-4 px-4">
        <div className="flex space-x-4">
          <p className="border-2 border-black px-2 rounded-full">
            {formattedDateStart} - {formattedDateEnd}
          </p>
          <p className="border-2 border-black px-2 rounded-full">
            {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
        <p className="border-2 border-black px-2 rounded-full">
          {isFree ? 'Miễn phí' : price + ' vnđ'}
        </p>
      </div>
    </div>
  );
};

export default CardEvents;
