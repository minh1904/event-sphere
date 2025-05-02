'use client';

import { useAtom } from 'jotai';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import { isCartOpenAtom } from '@/app/state/CartContext';

const CartToggle = () => {
  const [isCartOpen, setIsCartOpen] = useAtom(isCartOpenAtom);

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <LocalMallSharpIcon
      className="cursor-pointer mb-0.5"
      sx={{ fontSize: 35 }}
      onClick={handleToggleCart}
    />
  );
};

export default CartToggle;
