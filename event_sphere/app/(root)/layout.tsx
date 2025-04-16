import Navbar from '@/components/Navbar';
import { Providers } from '../state/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        {' '}
        <Navbar />
        {children}
      </Providers>
    </>
  );
}
