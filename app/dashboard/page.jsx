// app/dashboard/page.jsx
import Sidebar from './Sidebar';
import BalanceCard from './BalanceCard';
import PortfolioSection from './PortfolioSection';
import CryptoMarketSection from './components/CryptoMarketSection';
import MiningSection from './MiningSection';
import { getUser } from '@/lib/get,aaaaaaUser';

export default async function Dashboard() {
  const userData = await getUser();
  if (!userData) return <UnauthorizedMessage />;
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-black text-white p-6 space-y-6">
        <BalanceCard user={userData} />
        <PortfolioSection balances={userData.balances} />
        {/* <CryptoMarketSection /> */}
        <MiningSection walletId={userData.wallet_id} />
      </main>
    </div>
  );
}
