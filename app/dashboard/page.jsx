// app/dashboard/page.jsx
import Sidebar from './Sidebar/Sidebar';
import PortfolioSection from './PortfolioSection/PortfolioSection';
import CoinMarketSection from './CoinMarketSection.jsx/CoinMarketSection';
import BalanceCard from './BalanceCard/BalanceCard';
import { getUser } from '@/lib/getUsers';
import { getUserAssets } from '@/lib/getUserAssets';

export default async function Dashboard() {
  const userData = await getUser();
  if (!userData) return <UnauthorizedMessage />;

  // Fetch assets from DB
  const balances = await getUserAssets();

  return (
    <section className="relative min-h-screen flex bg-black overflow-hidden">
      {/* Animated GIF Background */}
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="Crypto animation"
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
      />

      <main className="relative flex-1 z-10 p-2 sm:p-4 md:p-6 flex flex-col gap-6 max-w-full overflow-x-hidden">
        {/* 1. Greeting */}
        <div className="w-full flex flex-col items-center justify-center mt-2 mb-4 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,165,0,0.7)] animate-pulse text-center">
            Welcome, <span className="text-white drop-shadow-[0_0_15px_#ffbf00]">{userData.username}</span>!
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-orange-100 text-center drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]">
            Your all-in-one dashboard for trading, mining, and managing your crypto assets.
          </p>
        </div>

        {/* 2. Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-4">
            <BalanceCard user={userData} />
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-bold py-3 rounded-md shadow-lg transition-all text-sm sm:text-base">
                Deposit
              </button>
              <button className="flex-1 bg-gradient-to-r from-red-400 to-orange-400 hover:from-orange-500 hover:to-red-400 text-black font-bold py-3 rounded-md shadow-lg transition-all text-sm sm:text-base">
                Withdraw
              </button>
            </div>
          </div>
          <MiningProgress walletId={userData.wallet_id} />
        </div>

        {/* 3. Portfolio Overview */}
        <PortfolioSection balances={balances} />

        {/* 4. Market Overview */}
        <CoinMarketSection />

        {/* 5. Quick Trade */}
        <div className="bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md mt-8 w-full overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-orange-300">Quick Trade</h2>
          <p className="text-gray-300 mb-4 text-sm sm:text-base">Buy or sell your favorite cryptocurrencies instantly.</p>
          <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
            <input
              type="number"
              placeholder="Amount"
              className="flex-1 p-3 rounded-md bg-zinc-700 text-white text-sm"
            />
            <select className="flex-1 p-3 rounded-md bg-zinc-700 text-yellow-400 font-bold text-sm">
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 px-4 rounded-md shadow-lg text-sm">
              Buy
            </button>
            <button className="bg-gradient-to-r from-red-400 to-orange-400 hover:from-orange-500 hover:to-red-400 text-black font-bold py-3 px-4 rounded-md shadow-lg text-sm">
              Sell
            </button>
          </div>
        </div>

        {/* 6. Recent Transactions */}
        <div className="bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md mt-8 w-full overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-orange-300">Recent Transactions</h2>
          <ul className="space-y-2">
            {/* Replace with dynamic transaction data */}
            <li className="flex justify-between text-xs sm:text-sm text-gray-300">
              <span>Deposit</span>
              <span className="text-green-400">+0.05 BTC</span>
              <span className="text-gray-400">2025-06-27</span>
            </li>
            <li className="flex justify-between text-xs sm:text-sm text-gray-300">
              <span>Trade</span>
              <span className="text-yellow-400">-0.01 BTC / +0.3 ETH</span>
              <span className="text-gray-400">2025-06-26</span>
            </li>
            <li className="flex justify-between text-xs sm:text-sm text-gray-300">
              <span>Mining Reward</span>
              <span className="text-blue-400">+0.0021 BTC</span>
              <span className="text-gray-400">2025-06-25</span>
            </li>
          </ul>
        </div>
      </main>
    </section>
  );
}

// Helper for unauthorized users
function UnauthorizedMessage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black relative">
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="Crypto animation"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />
      <div className="z-10 bg-zinc-900 bg-opacity-80 p-8 rounded-xl shadow-lg max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Unauthorized</h2>
        <p className="text-orange-200 mb-6">You must be logged in to view your dashboard.</p>
        <a
          href="/login"
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-md hover:from-orange-400 hover:to-yellow-300 transition-all shadow-[0_0_25px_#ff9900]"
        >
          Login
        </a>
      </div>
    </section>
  );
}

// Minimal Mining Progress Component
function MiningProgress() {
  // You can fetch mining progress from API or use a placeholder/progress bar
  // For demo, let's use a static progress bar
  return (
    <div className="bg-zinc-800 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md w-full">
      <span className="text-orange-300 font-semibold mb-2 text-sm sm:text-base">Mining Progress</span>
      <div className="w-full bg-zinc-700 rounded-full h-4 mb-2">
        <div
          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all"
          style={{ width: `60%` }} // Replace with dynamic value if available
        ></div>
      </div>
      <span className="text-yellow-400 font-bold text-sm sm:text-base">60%</span>
    </div>
  );
}
