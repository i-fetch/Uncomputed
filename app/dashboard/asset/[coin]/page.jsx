'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';

const COIN_ICONS = {
  BTC: <FaBitcoin className="inline text-yellow-400 mr-1" />,
  ETH: <FaEthereum className="inline text-blue-400 mr-1" />,
  USDT: <FaDollarSign className="inline text-green-400 mr-1" />,
};

export default function AssetPage() {
  const router = useRouter();
  const params = useParams();
  const coin = params.coin?.toUpperCase();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  // Fetch asset details from API
  useEffect(() => {
    async function fetchAsset() {
      setLoading(true);
      try {
        const res = await fetch(`/api/asset/${coin}`);
        if (!res.ok) throw new Error('Failed to fetch asset');
        const data = await res.json();
        setAsset(data);
      } catch {
        setAsset({ coin, amount: 0 });
      }
      setLoading(false);
    }
    if (coin) fetchAsset();
  }, [coin]);

  // Deposit logic (placeholder)
  const handleDeposit = async (e) => {
    e.preventDefault();
    setMessage('Processing deposit...');
    // Simulate API call
    setTimeout(() => {
      setAsset((prev) => ({ ...prev, amount: prev.amount + Number(amount) }));
      setMessage('Deposit successful!');
      setAmount('');
      setShowDeposit(false);
    }, 1200);
  };

  // Withdraw logic (placeholder)
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (Number(amount) > asset.amount) {
      setMessage('Insufficient balance.');
      return;
    }
    setMessage('Processing withdrawal...');
    setTimeout(() => {
      setAsset((prev) => ({ ...prev, amount: prev.amount - Number(amount) }));
      setMessage('Withdrawal successful!');
      setAmount('');
      setShowWithdraw(false);
    }, 1200);
  };

  if (loading) return <div>Loading...</div>;
  if (!asset) return <div>Asset not found</div>;

  return (
    <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-xl shadow-lg mt-10">
      <button
        onClick={() => router.back()}
        className="mb-4 text-orange-400 hover:underline"
      >
        &larr; Back to Portfolio
      </button>
      <div className="flex items-center mb-4">
        {COIN_ICONS[coin]}
        <h2 className="text-2xl font-bold ml-2">{coin} Asset</h2>
      </div>
      <div className="mb-6">
        <p className="text-lg text-gray-300">Balance:</p>
        <p className="text-3xl font-bold text-yellow-400">{asset.amount.toFixed(4)} {coin}</p>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowDeposit(true)}
          className="flex-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-bold py-3 rounded-md shadow-lg transition-all"
        >
          Deposit
        </button>
        <button
          onClick={() => setShowWithdraw(true)}
          className="flex-1 bg-gradient-to-r from-red-400 to-orange-400 hover:from-orange-500 hover:to-red-400 text-black font-bold py-3 rounded-md shadow-lg transition-all"
        >
          Withdraw
        </button>
      </div>
      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Deposit {coin}</h3>
            <form onSubmit={handleDeposit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 bg-zinc-700 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-bold py-3 rounded-md shadow-lg transition-all"
              >
                Confirm Deposit
              </button>
              <button
                onClick={() => setShowDeposit(false)}
                className="w-full mt-2 text-center text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </form>
            {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}
          </div>
        </div>
      )}
      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Withdraw {coin}</h3>
            <form onSubmit={handleWithdraw}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 bg-zinc-700 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-400 to-orange-400 hover:from-orange-500 hover:to-red-400 text-black font-bold py-3 rounded-md shadow-lg transition-all"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setShowWithdraw(false)}
                className="w-full mt-2 text-center text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </form>
            {message && <p className="mt-4 text-center text-yellow-400">{message}</p>}
          </div>
        </div>
      )}
      {/* You can add transaction history, charts, etc. here */}
    </div>
  );
}