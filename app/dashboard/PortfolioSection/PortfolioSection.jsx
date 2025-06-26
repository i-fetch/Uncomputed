'use client';

const PortfolioSection = ({ balances }) => (
  <div id="portfolio" className="bg-zinc-800 p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-orange-300">My Portfolio</h2>
    <ul className="space-y-2">
      {balances.map((coin, i) => (
        <li key={i} className="flex justify-between text-sm">
          <span>{coin.coin}</span>
          <span className="text-yellow-400">{coin.amount.toFixed(4)}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PortfolioSection;
