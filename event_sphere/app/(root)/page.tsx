import Cart from '@/components/cart/Cart';
import Events from '@/components/Events';
import Search from '@/components/Search';
import { Pagination } from '@/components/ui/pagination';
import * as React from 'react';

const Home = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) => {
  const params = await searchParams;
  const query = params.query || '';
  return (
    <div className="mt-35 md:mt-50">
      <div className="flex justify-center mb-5">
        <h1 className="uppercase text-3xl md:text-5xl font-bold ">
          Tìm kiếm sự kiện
        </h1>
      </div>
      <Search query={query} />
      <Events searchParams={searchParams} />
      <Pagination />
      <Cart />
    </div>
  );
};

export default Home;
