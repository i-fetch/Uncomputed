'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUserCheck, FaBolt, FaWallet, FaChartLine, FaExchangeAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <FaHome /> },
  { name: 'KYC', href: '/dashboard/verification', icon: <FaUserCheck /> },
  { name: 'Mining', href: '/dashboard/mining', icon: <FaBolt /> },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: <FaWallet /> },
  { name: 'Market', href: '/dashboard/market', icon: <FaChartLine /> },
  { name: 'Transactions', href: '/dashboard/transactions', icon: <FaExchangeAlt /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <FaCog /> },
  { name: 'Logout', href: '/logout', icon: <FaSignOutAlt /> },
];

const Sidebar = ({ isBottomNav = false }) => {
  const pathname = usePathname();
  const router = useRouter();

  if (isBottomNav) {
    // Render as bottom nav (icons only, app style)
    return (
      <>
        {navItems.slice(0, 5).map(({ name, href, icon }) => (
          <button
            key={href}
            onClick={() => router.push(href)}
            className={`flex flex-col items-center justify-center px-2 ${
              pathname === href ? 'text-yellow-400' : 'text-gray-300'
            }`}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label={name}
          >
            {icon}
            <span className="text-xs">{name}</span>
          </button>
        ))}
      </>
    );
  }

  // Render as sidebar for desktop, with icons
  return (
    <aside className="w-64 min-h-screen bg-zinc-900 bg-opacity-90 border-r border-zinc-800 p-6 hidden md:block z-20">
      <h2 className="text-xl font-bold mb-6 text-orange-400">CryptoMine</h2>
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ name, href, icon }) => (
          <button
            key={href}
            onClick={() => router.push(href)}
            className={`text-left text-white hover:text-yellow-400 transition w-full ${
              pathname === href ? 'font-semibold text-yellow-300' : ''
            }`}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <div className="flex items-center">
              {icon}
              <span className="ml-2">{name}</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
