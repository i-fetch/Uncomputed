'use client';

import Sidebar from './Sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <section className="relative min-h-screen flex bg-black overflow-hidden">
      {/* Animated GIF Background */}
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="Crypto animation"
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
      />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="relative flex-1 z-10 p-0 flex flex-col">{children}</main>

      {/* Bottom Sidebar (App-like Navigation) */}
      <nav className="fixed bottom-0 left-0 w-full z-20 bg-zinc-900 bg-opacity-95 border-t border-zinc-800 flex justify-around items-center py-3 md:hidden">
        <Sidebar isBottomNav />
      </nav>
    </section>
  );
}