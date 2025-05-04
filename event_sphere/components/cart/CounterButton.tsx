'use client';
import React, { useState } from 'react';

interface CounterButtonProps {
  quantity: number;
}

const CounterButton = ({ quantity }: CounterButtonProps) => {
  const [count, setCount] = useState(quantity);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="border-1 border-black flex justify-between px-1">
      <span className="cursor-pointer px-1" onClick={decrease}>
        -
      </span>
      <span className="border-x-1 border-black px-2">{count}</span>
      <span className="cursor-pointer px-1" onClick={increase}>
        +
      </span>
    </div>
  );
};

export default CounterButton;
