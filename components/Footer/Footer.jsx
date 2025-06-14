import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-zinc-900 to-black border-t border-zinc-800 py-10 px-6 text-center text-gray-400 text-sm">
      <div className="mb-3 flex justify-center gap-6 text-green-400 text-lg">
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Support</a>
      </div>
      <p className="text-zinc-500">
        © {new Date().getFullYear()} CypherVault Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
