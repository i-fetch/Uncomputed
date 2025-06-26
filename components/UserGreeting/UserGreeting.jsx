'use client';
import React from 'react';

const UserGreeting = ({ username, wallet_id, kycStatus }) => {
  return (
    <div className="bg-zinc-900 bg-opacity-80 mb-6 p-6 rounded-xl shadow-lg">
      <p className="text-lg font-semibold">
        Welcome, <span className="text-yellow-400">{username}</span>
      </p>
      <p className="text-sm text-gray-400">Wallet ID: {wallet_id}</p>
      <p className="text-sm text-gray-400">
        KYC Status:{' '}
        <span className="capitalize text-orange-400">{kycStatus}</span>
      </p>
    </div>
  );
};

export default UserGreeting;
