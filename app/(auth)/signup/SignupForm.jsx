'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { signupAction } from '@/controllers/Userregister';
import { toast } from 'sonner';

const SignupForm = () => {
  const [formState, formAction] = useFormState(signupAction, {
    status: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    const form = e.target;
    const password = form.password.value;
    if (password.length < 7) {
      e.preventDefault();
      toast.error('Password must be at least 7 characters.');
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (formState.message) {
      setLoading(false);
      if (formState.status === 'success') {
        toast.success(formState.message);
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <img
        src="https://i.gifer.com/7Ik1.gif"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-white text-lg font-semibold">Registering...</span>
          </div>
        </div>
      )}

      <div className="z-10 bg-zinc-900 bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-transparent bg-clip-text mb-6">
          Create an Account
        </h1>

        <form action={formAction} className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={7}
            className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-gray-400"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-300 text-black font-bold py-3 rounded-md shadow-[0_0_20px_#ff9900]"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="text-sm text-center text-gray-400 mt-2">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-400 hover:underline">
              Login
            </Link>
          </p>

          {formState.message && (
            <p
              className={`text-sm text-center mt-2 ${
                formState.status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {formState.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
