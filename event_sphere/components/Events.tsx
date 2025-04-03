import { FilterType } from './FilterType';
import { FilterFee } from './FilterFee';
import CardEvents from './CardEvents';
import { PaginationComponent } from './PaginationComponent';

const events = [
  {
    id: 1,
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
  {
    id: 2,
    imageUrl: '/imgs/ev2.jpg',
    title: 'Hội Chợ Ẩm Thực',
    description: 'Khám phá những món ăn đặc sắc từ nhiều nền văn hóa.',
    dateRange: '15-17/04',
    timeRange: '10:00 - 22:00',
    price: 0,
    isFree: true,
    ticketLeft: 50,
    type: 'Food Festival',
  },
  {
    id: 3,
    imageUrl: '/imgs/ev3.jpg',
    title: 'Workshop Chụp Ảnh',
    description: 'Nâng cao kỹ năng chụp ảnh với chuyên gia.',
    dateRange: '20/04',
    timeRange: '14:00 - 17:00',
    price: 300000,
    isFree: false,
    ticketLeft: 20,
    type: 'Workshop',
  },
  {
    id: 4,
    imageUrl: '/imgs/ev4.jpg',
    title: 'Triển Lãm Nghệ Thuật',
    description: 'Trưng bày các tác phẩm nghệ thuật từ các họa sĩ nổi tiếng.',
    dateRange: '25-30/04',
    timeRange: '09:00 - 18:00',
    price: 0,
    isFree: true,
    ticketLeft: 100,
    type: 'Exhibition',
  },
  {
    id: 5,
    imageUrl: '/imgs/ev5.jpg',
    title: 'Chạy Marathon',
    description: 'Thử thách bản thân với đường chạy 10km.',
    dateRange: '05/05',
    timeRange: '06:00 - 10:00',
    price: 200000,
    isFree: false,
    ticketLeft: 30,
    type: 'Sports',
  },
  {
    id: 6,
    imageUrl: '/imgs/ev6.jpg',
    title: 'Đêm Hội Halloween',
    description: 'Hóa trang và tham gia các hoạt động thú vị.',
    dateRange: '31/10',
    timeRange: '19:00 - 23:00',
    price: 150000,
    isFree: false,
    ticketLeft: 40,
    type: 'Festival',
  },
  {
    id: 7,
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
  {
    id: 8,
    imageUrl: '/imgs/ev2.jpg',
    title: 'Hội Chợ Ẩm Thực',
    description: 'Khám phá những món ăn đặc sắc từ nhiều nền văn hóa.',
    dateRange: '15-17/04',
    timeRange: '10:00 - 22:00',
    price: 0,
    isFree: true,
    ticketLeft: 50,
    type: 'Food Festival',
  },
  {
    id: 9,
    imageUrl: '/imgs/ev3.jpg',
    title: 'Workshop Chụp Ảnh',
    description: 'Nâng cao kỹ năng chụp ảnh với chuyên gia.',
    dateRange: '20/04',
    timeRange: '14:00 - 17:00',
    price: 300000,
    isFree: false,
    ticketLeft: 20,
    type: 'Workshop',
  },
  {
    id: 10,
    imageUrl: '/imgs/ev4.jpg',
    title: 'Triển Lãm Nghệ Thuật',
    description: 'Trưng bày các tác phẩm nghệ thuật từ các họa sĩ nổi tiếng.',
    dateRange: '25-30/04',
    timeRange: '09:00 - 18:00',
    price: 0,
    isFree: true,
    ticketLeft: 100,
    type: 'Exhibition',
  },
  {
    id: 11,
    imageUrl: '/imgs/ev5.jpg',
    title: 'Chạy Marathon',
    description: 'Thử thách bản thân với đường chạy 10km.',
    dateRange: '05/05',
    timeRange: '06:00 - 10:00',
    price: 200000,
    isFree: false,
    ticketLeft: 30,
    type: 'Sports',
  },
  {
    id: 12,
    imageUrl: '/imgs/ev6.jpg',
    title: 'Đêm Hội Halloween',
    description: 'Hóa trang và tham gia các hoạt động thú vị.',
    dateRange: '31/10',
    timeRange: '19:00 - 23:00',
    price: 150000,
    isFree: false,
    ticketLeft: 40,
    type: 'Festival',
  },
];

function removeVietnameseTones(str: string): string {
  str = str.toLowerCase();
  str = str
    .replace(/[àáảãạăằắẳẵặâầấẩẫậ]/g, 'a')
    .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
    .replace(/[ìíỉĩị]/g, 'i')
    .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
    .replace(/[ùúủũụưừứửữự]/g, 'u')
    .replace(/[ỳýỷỹỵ]/g, 'y')
    .replace(/[đ]/g, 'd');
  str = str.replace(/[^a-z0-9\s]/g, '');
  return str;
}

const Events = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const searchQuery = searchParams?.query || '';
  const normalizedQuery = removeVietnameseTones(searchQuery);

  const filteredEvents = events.filter((event) => {
    const normalizedTitle = removeVietnameseTones(event.title);
    return normalizedTitle.includes(normalizedQuery);
  });
  const eventsPerPage = 9; // Số sự kiện mỗi trang
  const currentPage = Number(searchParams?.page) || 1; // Lấy trang hiện tại từ searchParams
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage); // Tổng số trang

  // Đảm bảo currentPage hợp lệ
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  // Tính toán sự kiện hiển thị trên trang hiện tại
  const startIndex = (validPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  return (
    <div className="mt-5">
      {/* Bộ lọc */}
      <div className="flex gap-2.5 justify-center">
        <FilterType />
        <FilterFee />
      </div>

      <div className="container mx-auto px-4 py-8 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </div>

      <div className="mt-8 mb-10">
        <PaginationComponent pageCount={totalPages} />
      </div>
    </div>
  );
};

export default Events;
