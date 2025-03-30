import Events from '@/components/Events';
import Search from '@/components/Search';

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <div className="mt-8 md:mt-20">
      <div className="flex justify-center mb-5">
        <h1 className="uppercase text-3xl md:text-5xl font-bold ">
          Tìm kiếm sự kiện
        </h1>
      </div>
      <Search query={query} />
      <Events />
    </div>
  );
};

export default Home;
