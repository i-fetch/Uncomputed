'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { connectToDB } from '@/lib/connectDB';
import Asset from '@/models/asset';
import User from '@/models/User';

// Fetch all assets for the logged-in user
export async function getUserAssets() {
  await connectToDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  // Find user
  const user = await User.findOne({ email: session.user.email });
  if (!user) return [];

  // Fetch assets
  const assets = await Asset.find({ user: user._id }).lean();

  // Return only plain objects
  return assets.map(({ coin, amount }) => ({
    coin,
    amount,
  }));
}

// Add a new asset for the user (if not already present)
export async function addUserAsset(coin) {
  await connectToDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { status: 'error', message: 'Unauthorized' };

  // Find user
  const user = await User.findOne({ email: session.user.email });