'use client';

import { useRouter } from 'next/navigation';
import { FaBitcoin, FaEthereum, FaDollarSign, FaPlusCircle, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Supported coins and their icons
const COIN_ICONS = {
  BTC: <FaBitcoin className="inline text-yellow-400 mr-1" />,
  ETH: <FaEthereum className="inline text-blue-400 mr-1" />,
  USDT: <FaDollarSign className="inline text-green-400 mr-1" />,
};

const SUPPORTED_COINS = [
  { coin: 'BTC', name: 'Bitcoin' },
  { coin: 'ETH', name: 'Ethereum' },
  { coin: 'USDT', name: 'Tether' },
  // Add more supported coins here
];

const PortfolioSection = ({ balances }) => {
  const router = useRouter();
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [message, setMessage] = useState('');
  const [prices, setPrices] = useState({});
  const [priceChanges, setPriceChanges] = useState({});

  // Fetch live prices and 24h change for supported coins
  useEffect(() => {
    async function fetchPrices() {
      try {
        const ids = SUPPORTED_COINS.map(c => c.name.toLowerCase()).join('%2C');
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await res.json();
        setPrices({
          BTC: data.bitcoin?.usd ?? 0,
          ETH: data.ethereum?.usd ?? 0,
          USDT: data.tether?.usd ?? 0,
        });
        setPriceChanges({
          BTC: data.bitcoin?.usd_24h_change ?? 0,
          ETH: data.ethereum?.usd_24h_change ?? 0,
          USDT: data.tether?.usd_24h_change ?? 0,
        });
      } catch {
        setPrices({});
        setPriceChanges({});
      }
    }
    fetchPrices();
  }, []);

  // Get user's coins for quick lookup
  const userCoins = balances.map((b) => b.coin);

  // Add asset logic (placeholder, should call API in real app)
  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!selectedCoin) return;
    setMessage('Asset added! (Demo only)');
    setTimeout(() => {
      setShowAddAsset(false);
      setMessage('');
      setSelectedCoin('');
      // In real app, refresh balances from server
    }, 1000);
  };

  const handleAssetClick = (coin) => {
    router.push(`/dashboard/asset/${coin}`);
  };

  // Calculate total USD value
  const totalUsd = balances.reduce(
    (sum, asset) => sum + (prices[asset.coin] ? asset.amount * prices[asset.coin] : 0),
    0
  );

  return (
    <div id="portfolio" className="bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-orange-300">My Assets</h2>
        <button
          className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition"
          onClick={() => setShowAddAsset(true)}
        >
          <FaPlusCircle /> Add Asset
        </button>
      </div>
      {/* Total balance */}
      <div className="mb-4 flex items-center justify-between bg-zinc-900 rounded-lg px-4 py-3">
        <span className="text-gray-300 font-semibold">Total Balance</span>
        <span className="text-2xl font-bold text-yellow-400">${totalUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>
      <ul className="space-y-2">
        {balances.length === 0 && (
          <li className="text-gray-400">No assets found.</li>
        )}
        {balances.map((coin, i) => {
          const usdValue = prices[coin.coin] ? coin.amount * prices[coin.coin] : 0;
          const change = priceChanges[coin.coin] || 0;
          const isFalling = change < 0;
          return (
            <li
              key={i}
              className={`flex justify-between items-center text-sm bg-zinc-900 hover:bg-zinc-700 transition rounded-lg px-4 py-3 cursor-pointer border-l-4 ${
                isFalling
                  ? 'border-red-500'
                  : 'border-green-500'
              }`}
              onClick={() => handleAssetClick(coin.coin)}
              tabIndex={0}
              aria-label={`View ${coin.coin} asset details`}
            >
              <span className="flex items-center gap-2">
                {COIN_ICONS[coin.coin] || <FaDollarSign className="inline text-gray-400 mr-1" />}
                <span className="font-semibold">{coin.coin}</span>
                <span className={`ml-2 flex items-center text-xs font-bold ${
                  isFalling ? 'text-red-400' : 'text-green-400'
                }`}>
                  {isFalling ? <FaArrowDown /> : <FaArrowUp />}
                  {Math.abs(change).toFixed(2)}%
                </span>
              </span>
              <span className="flex flex-col items-end">
                <span className="text-yellow-400 font-mono">{coin.amount.toFixed(4)}</span>
                <span className="text-xs text-gray-300">
                  ${usdValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-gray-400 mt-4">
        Click an asset to view details, deposit, withdraw, or see your wallet address.
      </p>

      {/* Add Asset Modal */}
      {showAddAsset && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Add New Asset</h3>
            <form onSubmit={handleAddAsset}>
              <label className="block text-gray-300 mb-2">Select Asset:</label>
              <select
                className="w-full p-3 rounded-md bg-zinc-800 text-white mb-4"
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                required
              >
                <option value="">-- Choose a coin --</option>
                {SUPPORTED_COINS.filter(c => !userCoins.includes(c.coin)).map((c) => (
                  <option key={c.coin} value={c.coin}>
                    {c.name} ({c.coin})
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-2 rounded-md transition hover:from-green-500 hover:to-green-700"
              >
                Add Asset
              </button>
              {message && (
                <p className="mt-4 text-center text-green-400 font-semibold">{message}</p>
              )}
            </form>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"
              onClick={() => setShowAddAsset(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
