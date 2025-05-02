'use client';
import { isCartCountAtom } from '@/app/state/CartCount';
import { useAtom } from 'jotai';
import React from 'react';

const CounterButton = () => {
  const [isCartCount, setIsCartCount] = useAtom(isCartCountAtom);
  const increase = () => {
    setIsCartCount(isCartCount + 1);
  };
  const decrease = () => {
    if (isCartCount > 0) setIsCartCount(isCartCount - 1);
    else return null;
  };
  return (
    <div className="border-1 border-black  flex justify-between px-1">
      <span className="cursor-pointer px-1" onClick={decrease}>
        -
      </span>
      <span className="border-x-1 border-black px-2">{isCartCount}</span>
      <span className="cursor-pointer - px-1" onClick={increase}>
        +
      </span>
    </div>
  );
};

export default CounterButton;
