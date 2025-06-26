'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mining', href: '/dashboard/mining' },
  { name: 'Portfolio', href: '/dashboard#portfolio' },
  { name: 'Market', href: '/dashboard#market' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 bg-opacity-90 border-r border-zinc-800 p-6 hidden md:block z-20">
      <h2 className="text-xl font-bold mb-6 text-orange-400">CryptoMine</h2>
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ name, href }) => (
          <Link
            key={href}
            href={href}
            className={`text-white hover:text-yellow-400 transition ${
              pathname === href ? 'font-semibold text-yellow-300' : ''
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
