// CryptoMarketSection.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

// Example: You can use CoinGecko API or any public crypto API
const COIN_ICONS = {
  bitcoin: <FaBitcoin className="inline text-yellow-400 mr-1" />,
  ethereum: <FaEthereum className="inline text-blue-400 mr-1" />,
};

export default function CoinMarketSection() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarket() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setCoins([]);
      }
      setLoading(false);
    }
    fetchMarket();
  }, []);

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">Market Overview</h2>
      {loading ? (
        <div className="text-orange-200">Loading market data...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-orange-400 border-b border-zinc-700">
                <th className="py-2 px-3 text-left">Coin</th>
                <th className="py-2 px-3 text-right">Price (USD)</th>
                <th className="py-2 px-3 text-right">Market Cap</th>
                <th className="py-2 px-3 text-right">24h Change</th>
                <th className="py-2 px-3 text-right">Graph (7d)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} className="border-b border-zinc-700 hover:bg-zinc-900 transition">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    <span className="font-bold">{coin.name}</span>
                    <span className="text-gray-400 text-xs ml-1">{coin.symbol.toUpperCase()}</span>
                  </td>
                  <td className="py-2 px-3 text-right text-yellow-400 font-mono">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right text-orange-200 font-mono">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 px-3 text-right font-mono ${
                      coin.price_change_percentage_24h > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Sparkline data={coin.sparkline_in_7d.price} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Simple sparkline using SVG
function Sparkline({ data }) {
  if (!data || data.length === 0) return null;
  const width = 80;
  const height = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-green-400"
      />
    </svg>
  );
}
