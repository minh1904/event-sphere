'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface CounterButtonProps {
  productId: number;
  quantity: number;
  onQuantityChange: () => void;
}

const CounterButton = ({
  productId,
  quantity,
  onQuantityChange,
}: CounterButtonProps) => {
  const [count, setCount] = useState(quantity);

  const mutation = useMutation({
    mutationFn: async (newQty: number) => {
      await axios.put('/api/cart/update', { productId, quantity: newQty });
      return newQty;
    },
    onSuccess: (newQty) => {
      setCount(newQty);
      onQuantityChange();
    },
  });

  const increase = () => mutation.mutate(count + 1);
  const decrease = () => {
    if (count > 1) mutation.mutate(count - 1);
  };

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
