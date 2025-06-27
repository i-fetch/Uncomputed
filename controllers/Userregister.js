'use server';

import { connectToDB } from '@/lib/connectDB';
import User from '@/models/User';
import Asset from '@/models/asset';
import { hash } from 'bcryptjs';
import crypto from 'crypto';

function generateCustomWalletId() {
  // Format: BITPULSE-XXXXXX-YYYYYY (random hex segments)
  const part1 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const part2 = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `bitpulse-${part1}-${part2}`;
}

export async function signupAction(prevState, formData) {
  try {
    await connectToDB();

    const { username, email, password } = Object.fromEntries(formData);

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return { status: 'error', message: 'Email already registered.' };
    }

    // Generate unique wallet_id with custom format
    let wallet_id;
    let exists = true;
    while (exists) {
      wallet_id = generateCustomWalletId();
      exists = await User.findOne({ wallet_id });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      wallet_id,
      balances: [
        { coin: 'BTC', amount: 0 },
        { coin: 'USDT', amount: 0 },
      ],
    });

    // Create Asset documents for the user
    await Asset.create([
      { user: user._id, coin: 'BTC', amount: 0 },
      { user: user._id, coin: 'USDT', amount: 0 },
    ]);

    return { status: 'success', message: 'Registration successful! Please log in.' };
  } catch (err) {
    return { status: 'error', message: 'Registration failed. Try again.' };
  }
}
