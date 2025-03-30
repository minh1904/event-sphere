import Form from 'next/form';
import SearchIcon from '@mui/icons-material/Search';
import SearchReset from './ui/SearchReset';

const Search = ({ query }: { query: string }) => {
  return (
    <div className=" relative w-dvw max-w-sm mx-auto lg:max-w-[618px] ">
      <Form action="/" scroll={false} className="search-form  ">
        <input
          name="query"
          defaultValue={query}
          placeholder="Nhập sự kiện"
          className=" w-full h-14 pl-4 pr-12 py-2 border rounded-[3px] border-black focus:outline-none"
        />

        <div className="flex gap-1.5 absolute right-2 top-1/2 transform -translate-y-1/2 ">
          {query && <SearchReset />}
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Search;
