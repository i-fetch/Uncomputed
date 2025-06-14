import React from 'react';
import { motion } from 'framer-motion';

const CoinSection = () => {
  const coins = ["₿ BTC", "Ξ ETH", "₮ USDT"];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-black via-zinc-800 to-black border-t border-zinc-700">
      <h2 className="text-3xl text-center text-green-400 font-bold drop-shadow-[0_0_8px_#22c55e]">
        Supported Assets
      </h2>
      <div className="mt-10 flex justify-center gap-12 text-white text-2xl">
        {coins.map((coin, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="hover:text-green-400 transition-all"
          >
            {coin}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CoinSection;
