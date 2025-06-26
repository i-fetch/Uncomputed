'use client';

const BalanceCard = ({ user }) => {
  const total = user.balances.reduce((sum, c) => sum + c.amount, 0).toFixed(4);

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
      <p className="text-lg mb-2">
        Wallet ID: <span className="text-yellow-400">{user.wallet_id}</span>
      </p>
      <p className="text-xl font-bold">
        Total Balance: <span className="text-green-400">{total} USD</span>
      </p>
    </div>
  );
};

export default BalanceCard;
