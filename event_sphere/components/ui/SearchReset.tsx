'use client';
import { useRouter } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';

const SearchReset = () => {
  const router = useRouter();

  const reset = () => {
    router.push('/');
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <ClearIcon />
    </button>
  );
};

export default SearchReset;
