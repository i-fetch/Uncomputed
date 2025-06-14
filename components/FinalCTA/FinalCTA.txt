import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl text-white font-bold"
      >
        Ready to take control of your crypto?
      </motion.h2>
      <motion.a
        href="/auth/register"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 inline-block px-8 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all shadow-lg"
      >
        Create an Account
      </motion.a>
    </section>
  );
};

export default FinalCTA;
