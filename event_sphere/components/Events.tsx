import { FilterType } from './FilterType';
import { FilterFee } from './FilterFee';
import CardEvents from './CardEvents';
import { PaginationComponent } from './PaginationComponent';

// Hàm xử lý dấu tiếng Việt
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

interface Event {
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

const Events = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const params = await searchParams;
  const searchQuery = params?.query || '';
  const feeFilter = params?.fee || '';
  const typeFilter = params?.type || '';

  const normalizedQuery = removeVietnameseTones(searchQuery);

  const response = await fetch('http://localhost:3000/api/data', {
    cache: 'no-store',
  });
  let events: Event[] = [];

  if (response.ok) {
    const data = await response.json();
    events = data.events;
  } else {
    console.error('Failed to fetch events');
  }

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

    const matchesType = typeFilter ? event.type === typeFilter : true;

    return matchesQuery && matchesFee && matchesType;
  });

  const eventsPerPage = 12;
  const currentPage = Number(params?.page) || 1;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (validPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  return (
    <div className="mt-5">
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
        {totalPages > 0 && <PaginationComponent pageCount={totalPages} />}
      </div>
    </div>
  );
};

export default Events;
