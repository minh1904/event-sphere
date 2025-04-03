import Events from '@/components/Events';
import Search from '@/components/Search';
import { Pagination } from '@/components/ui/pagination';

const Home = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const query = (await searchParams).query || '';
  return (
    <div className="mt-8 md:mt-56">
      <div className="flex justify-center mb-5">
        <h1 className="uppercase text-3xl md:text-5xl font-bold ">
          Tìm kiếm sự kiện
        </h1>
      </div>
      <Search query={query} />
      <Events searchParams={searchParams} />
      <Pagination />
    </div>
  );
};

export default Home;
