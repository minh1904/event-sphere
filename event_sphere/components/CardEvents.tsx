import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardEventsProps {
  _id: number;
  ticketLeft: number;
  imageUrl: string;
  type: string;
  title: string;
  description: string;
  dateRange: string;
  timeRange: string;
  price: number;
  isFree: boolean;
}

const CardEvents: React.FC<CardEventsProps> = ({
  _id,
  ticketLeft,
  imageUrl,
  type,
  title,
  description,
  dateRange,
  timeRange,
  price,
  isFree,
}) => {
  return (
    <div className="h-[500px] bg-[#ECDCC1] flex flex-col shadow-triple group overflow-hidden transition-all duration-300">
      <p className="py-2 text-center">{ticketLeft} vé còn lại</p>
      {/* Ảnh */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt="logo"
          fill
          quality={100}
          className="rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 space-y-1 px-4 ">
        <p className="text-gray-700 uppercase">{type}</p>
        <Link href={`/post/${_id}`} className="text-2xl uppercase font-bold">
          {title}
        </Link>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="flex justify-between mt-auto pb-4 px-4 ">
        <div className="flex space-x-4">
          <p className="border-2 border-black px-2 rounded-full">{dateRange}</p>
          <p className="border-2 border-black px-2 rounded-full">{timeRange}</p>
        </div>
        <p className="border-2 border-black px-2 rounded-full">
          {isFree ? 'Miễn phí' : price + ' vnđ'}
        </p>
      </div>
    </div>
  );
};

export default CardEvents;
