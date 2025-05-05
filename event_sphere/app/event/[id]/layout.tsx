import Navbar from '@/components/Navbar';
import { Providers } from '../../state/CartContext';
import Provider from '@/components/provider';
import { ReactQuery } from '@/app/ReactQuery';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQuery>
        <Provider>
          {' '}
          <Providers>
            {' '}
            <Navbar />
            {children}
          </Providers>
        </Provider>
      </ReactQuery>
    </>
  );
}
