'use client';

import { Provider } from 'jotai';
import { atom } from 'jotai';

export const isCartOpenAtom = atom<boolean>(false);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
