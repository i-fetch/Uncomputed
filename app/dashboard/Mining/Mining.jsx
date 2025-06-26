'use client';

const MiningSection = () => {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl mt-8 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">Mining</h2>
      <p className="text-sm text-gray-300 mb-4">
        Mining Status: <span className="text-green-400">Active</span>
      </p>
      <div className="bg-zinc-700 p-4 rounded-md">
        <p className="text-sm text-gray-400">Hash Rate: 120 MH/s</p>
        <p className="text-sm text-gray-400">Mined: 0.0021 BTC</p>
      </div>
      <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-md">
        Claim Rewards
      </button>
    </div>
  );
};

export default MiningSection;
