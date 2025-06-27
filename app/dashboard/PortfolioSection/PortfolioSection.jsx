'use client';

import { useRouter } from 'next/navigation';
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';

const COIN_ICONS = {
  BTC: <FaBitcoin className="inline text-yellow-400 mr-1" />,
  ETH: <FaEthereum className="inline text-blue-400 mr-1" />,
  USDT: <FaDollarSign className="inline text-green-400 mr-1" />,
};

const PortfolioSection = ({ balances }) => {
  const router = useRouter();

  const handleAssetClick = (coin) => {
    router.push(`/dashboard/asset/${coin}`);
  };

  return (
    <div id="portfolio" className="bg-zinc-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">My Portfolio</h2>
      <ul className="space-y-2">
        {balances.map((coin, i) => (
          <li
            key={i}
            className="flex justify-between text-sm cursor-pointer"
            onClick={() => handleAssetClick(coin.coin)}
          >
            <span className="flex items-center">
              {COIN_ICONS[coin.coin]}
              {coin.coin}
            </span>
            <span className="text-yellow-400">{coin.amount.toFixed(4)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSection;
