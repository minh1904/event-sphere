import { FilterType } from './FilterType';
import { FilterFee } from './FilterFee';
import CardEvents from './CardEvents';

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
    type: 'Âm nhạc/Giải trí', // Concert → Âm nhạc/Giải trí
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
    type: 'Văn hóa', // Food Festival → Văn hóa
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
    type: 'Giáo dục', // Workshop → Giáo dục
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
    type: 'Văn hóa', // Exhibition → Văn hóa
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
    type: 'Thể thao', // Sports → Thể thao
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
    type: 'Xã hội', // Festival → Xã hội
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
  str = str.replace(/[^a-z0-9\s/]/g, ''); // Giữ dấu "/" trong "Âm nhạc/Giải trí"
  return str;
}

const Events = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const searchQuery = searchParams?.query || '';
  const feeFilter = searchParams?.fee || ''; // 'free', 'paid', hoặc rỗng
  const typeFilter = searchParams?.type || ''; // Danh mục tiếng Việt hoặc rỗng

  const normalizedQuery = removeVietnameseTones(searchQuery);

  const filteredEvents = events.filter((event) => {
    const normalizedTitle = removeVietnameseTones(event.title);

    const matchesQuery = normalizedQuery
      ? normalizedTitle.includes(normalizedQuery)
      : true;

    const matchesFee =
      feeFilter === 'free'
        ? event.isFree
        : feeFilter === 'paid'
          ? !event.isFree
          : true;

    const matchesType = typeFilter
      ? event.type === typeFilter // So sánh chính xác với type tiếng Việt
      : true;

    return matchesQuery && matchesFee && matchesType;
  });

  return (
    <div className="mt-5">
      <div className="flex gap-2.5 justify-center">
        <FilterType />
        <FilterFee />
      </div>
      <div className="container mx-auto px-4 py-8 md:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
