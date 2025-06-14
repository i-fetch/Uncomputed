'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const SignupPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Register:', form);
    // registration logic here
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      <div className="z-10 bg-zinc-900 bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-300 text-black font-bold py-3 rounded-md shadow-[0_0_20px_#ff9900]"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-400 mt-2">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-orange-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
