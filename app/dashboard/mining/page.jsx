'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaBolt, FaBitcoin, FaEthereum, FaCheckCircle } from 'react-icons/fa';

const COINS = [
  { label: 'Bitcoin', value: 'BTC', icon: <FaBitcoin className="inline text-yellow-400 mr-1" /> },
  { label: 'Ethereum', value: 'ETH', icon: <FaEthereum className="inline text-blue-400 mr-1" /> },
];

const HASH_RATES = [
  { label: '60 MH/s', value: 60, reward: 0.0010 },
  { label: '120 MH/s', value: 120, reward: 0.0021 },
  { label: '240 MH/s', value: 240, reward: 0.0045 },
  { label: '480 MH/s', value: 480, reward: 0.0092 },
];

const Mining = () => {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [selectedRate, setSelectedRate] = useState(HASH_RATES[1]);
  const [mining, setMining] = useState(false);
  const [mined, setMined] = useState({ BTC: 0, ETH: 0 });
  const [status, setStatus] = useState('Idle');
  const [progress, setProgress] = useState(0);
  const [sessionMined, setSessionMined] = useState(0);

  const miningInterval = useRef(null);
  const progressInterval = useRef(null);

  const handleCoinChange = (e) => {
    const coin = COINS.find(c => c.value === e.target.value);
    setSelectedCoin(coin);
  };

  const handleRateChange = (e) => {
    const rate = HASH_RATES.find(r => r.value === Number(e.target.value));
    setSelectedRate(rate);
  };

  const handleMine = () => {
    setMining(true);
    setStatus('Mining...');
    setProgress(0);
    setSessionMined(0);

    // Simulate mining progress (60 seconds)
    let prog = 0;
    let seconds = 0;
    const miningDuration = 60; // seconds
    const rewardPerSecond = selectedRate.reward / miningDuration;

    miningInterval.current = setInterval(() => {
      seconds += 1;
      setSessionMined(prev => {
        const next = prev + rewardPerSecond;
        return next > selectedRate.reward ? selectedRate.reward : next;
      });
      if (seconds >= miningDuration) {
        clearInterval(miningInterval.current);
      }
    }, 1000);

    progressInterval.current = setInterval(() => {
      prog += 100 / miningDuration;
      if (prog >= 100) {
        prog = 100;
        clearInterval(progressInterval.current);
        setMining(false);
        setMined(prev => ({
          ...prev,
          [selectedCoin.value]: prev[selectedCoin.value] + selectedRate.reward,
        }));
        setStatus('Completed');
        setTimeout(() => setStatus('Idle'), 2000);
      }
      setProgress(prog);
    }, 1000);
  };

  // Cleanup intervals on unmount or when mining stops
  useEffect(() => {
    return () => {
      clearInterval(miningInterval.current);
      clearInterval(progressInterval.current);
    };
  }, []);

  useEffect(() => {
    if (!mining) {
      clearInterval(miningInterval.current);
      clearInterval(progressInterval.current);
      setSessionMined(0);
    }
  }, [mining]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-zinc-900 via-black to-zinc-800 relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="https://i.gifer.com/7Ik1.gif"
          alt="mining bg"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative z-10 w-full max-w-xl bg-zinc-900/90 rounded-2xl shadow-2xl p-10 border border-zinc-800">
        <div className="flex items-center justify-center mb-6">
          <FaBolt className="text-yellow-400 text-3xl animate-pulse mr-2" />
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text">
            Mining Console
          </h2>
        </div>
        <p className="text-center text-orange-100 mb-8">
          Select your cryptocurrency and hash rate, then start mining. Your rewards will be credited after mining completes!
        </p>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-2 font-semibold">Cryptocurrency</label>
            <select
              className="w-full p-3 rounded-lg bg-zinc-800 text-yellow-400 font-bold border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={selectedCoin.value}
              onChange={handleCoinChange}
              disabled={mining}
            >
              {COINS.map(coin => (
                <option key={coin.value} value={coin.value}>
                  {coin.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-2 font-semibold">Hash Rate</label>
            <select
              className="w-full p-3 rounded-lg bg-zinc-800 text-yellow-400 font-bold border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={selectedRate.value}
              onChange={handleRateChange}
              disabled={mining}
            >
              {HASH_RATES.map(rate => (
                <option key={rate.value} value={rate.value}>
                  {rate.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex flex-col items-center">
            <span className="text-gray-400 text-xs mb-1">Reward per session</span>
            <span className="flex items-center text-2xl font-bold text-yellow-400">
              {selectedCoin.icon} {selectedRate.reward} {selectedCoin.value}
            </span>
            <span className="text-xs text-orange-200 mt-2">
              ≈ {(selectedRate.reward * 60).toFixed(4)} {selectedCoin.value} / hour
            </span>
            <span className="text-xs text-orange-200">
              ≈ {(selectedRate.reward).toFixed(4)} {selectedCoin.value} / min
            </span>
          </div>
          <div className="flex-1 bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex flex-col items-center">
            <span className="text-gray-400 text-xs mb-1">Total Mined</span>
            <span className="flex items-center text-xl font-semibold text-yellow-400">
              {selectedCoin.icon} {mined[selectedCoin.value]?.toFixed(4)} {selectedCoin.value}
            </span>
            {mining && (
              <span className="text-xs text-green-400 mt-2">
                +{sessionMined.toFixed(6)} {selectedCoin.value} this session
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`w-48 py-3 rounded-lg font-bold text-lg shadow-lg transition-all bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black flex items-center justify-center ${
              mining ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            onClick={handleMine}
            disabled={mining}
          >
            {mining ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-black" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Mining...
              </>
            ) : (
              <>
                <FaBolt className="mr-2" /> Mine
              </>
            )}
          </button>
          {mining && (
            <div className="w-full mt-6">
              <div className="w-full bg-zinc-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-yellow-300 mt-2">{progress.toFixed(0)}%</p>
            </div>
          )}
          <p className={`mt-4 text-sm font-semibold ${
            status === 'Completed'
              ? 'text-green-400 flex items-center'
              : status === 'Mining...'
              ? 'text-yellow-400'
              : 'text-orange-300'
          }`}>
            {status === 'Completed' ? (
              <>
                <FaCheckCircle className="mr-1" /> Mining Completed!
              </>
            ) : (
              status
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mining;