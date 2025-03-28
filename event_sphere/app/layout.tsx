import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';

export const BeVietnamPro = localFont({
  src: [
    {
      path: '../public/fonts/BeVietnamPro-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BeVietnamPro-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/BeVietnamPro-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Event Sphere',
  description: 'A website about event',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${BeVietnamPro.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
