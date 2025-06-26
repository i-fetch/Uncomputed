'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BalanceGrid = ({ balances }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {balances?.map((coin, index) => (
        <Card
          key={index}
          className="bg-zinc-800 bg-opacity-80 p-4 rounded-xl text-center shadow-md"
        >
          <CardContent>
            <p className="text-lg font-semibold">{coin.coin}</p>
            <p className="text-2xl text-yellow-400">{coin.amount.toFixed(4)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BalanceGrid;
