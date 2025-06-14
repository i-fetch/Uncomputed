import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    { title: "Secure Wallets", desc: "Store your assets with multi-layer encryption." },
    { title: "Real BTC Mining", desc: "Mine simulated BTC with realistic rewards." },
    { title: "Fast Transactions", desc: "Deposit and withdraw in seconds." },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <h2 className="text-3xl text-center text-green-400 mb-12 font-bold drop-shadow-[0_0_10px_#22c55e]">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 shadow-[0_0_12px_#16a34a70]"
          >
            <h3 className="text-xl text-green-400 font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
