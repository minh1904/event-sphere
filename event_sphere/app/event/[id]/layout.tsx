import Navbar from '@/components/Navbar';
import { Providers } from '../../state/CartContext';
import Provider from '@/components/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider>
        {' '}
        <Providers>
          {' '}
          <Navbar />
          {children}
        </Providers>
      </Provider>
    </>
  );
}
