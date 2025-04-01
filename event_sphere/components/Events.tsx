import React from 'react';
import { FilterType } from './FilterType';
import { FilterFee } from './FilterFee';
import CardEvents from './CardEvents';

// Tách danh sách sự kiện ra ngoài component để tối ưu performance
const events = [
  {
    _id: 1,
    imageUrl: '/imgs/ev1.jpg',
    title: 'Hòa Nhạc Mùa Xuân',
    description: 'Trải nghiệm âm nhạc tuyệt vời trong không gian mở.',
    dateRange: '10-12/04',
    timeRange: '18:00 - 21:00',
    price: 500000,
    isFree: false,
    ticketLeft: 10,
    type: 'Concert',
  },
];

const Events = () => {
  return (
    <div className="mt-5">
      {/* Bộ lọc */}
      <div className="flex gap-2.5 justify-center">
        <FilterType />
        <FilterFee />
      </div>

      {/* Danh sách sự kiện */}
      <div className="container mx-auto px-4 py-8 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <CardEvents key={event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
