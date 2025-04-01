'use client';
import Form from 'next/form';
import SearchReset from './ui/SearchReset';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ query }: { query: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);
  return (
    <div className=" relative w-dvw max-w-sm mx-auto lg:max-w-[618px] ">
      <Form action="/" scroll={false} className="search-form  ">
        <input
          name="query"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Nhập sự kiện"
          className="w-full h-14 pl-4 pr-12 py-2 border rounded-[3px] border-black focus:outline-none"
        />

        <div className="flex gap-1.5 absolute right-2 top-1/2 transform -translate-y-1/2 ">
          {query && <SearchReset />}
        </div>
      </Form>
    </div>
  );
};

export default Search;
