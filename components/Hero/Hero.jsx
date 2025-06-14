import React from 'react';

const Hero = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 text-center relative overflow-hidden">
      {/* Fullscreen GIF Background */}
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="Crypto animation"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"

      />


      {/* Hero Content */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-2xl px-4 backdrop-brightness-90 rounded-xl py-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,165,0,0.7)] animate-pulse">
          Welcome to <span className="text-white drop-shadow-[0_0_15px_#ffbf00]">BTC 2.0</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-orange-100 leading-relaxed tracking-wide drop-shadow-[0_0_10px_rgba(255,165,0,0.4)]">
          <span className="text-yellow-300 font-semibold">Mine</span>, <span className="text-orange-300 font-semibold">deposit</span>, and <span className="text-red-300 font-semibold">grow</span> your digital assets with confidence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
          <a
            href="/signup"
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-md text-center hover:from-orange-400 hover:to-yellow-300 transition-all shadow-[0_0_25px_#ff9900]"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-orange-400 text-orange-300 font-bold rounded-md text-center hover:bg-orange-400 hover:text-black transition-all"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
