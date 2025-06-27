'use client';

const BalanceCard = ({ user }) => {
  // Ensure balances is an array of plain objects: [{ coin, amount }]
  const total = user.balances
    ? user.balances.reduce((sum, c) => sum + Number(c.amount), 0).toFixed(4)
    : '0.0000';

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold text-orange-300 mb-2">Total Portfolio Balance</h3>
      <span className="text-3xl font-bold text-yellow-400 mb-1">{total}</span>
      <span className="text-gray-400 text-sm">Across all assets</span>
    </div>
  );
};

export default BalanceCard;
