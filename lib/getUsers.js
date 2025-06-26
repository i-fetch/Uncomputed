'use server';

import { connectToDB } from '@/lib/connectDB';
import User from '@/models/User';
import { getServerSession } from 'next-auth'; // You need this
import { authOptions } from '@/auth'; // Assuming you're using NextAuth properly

export const getUser = async () => {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions); // FIXED this line
    if (!session?.user?.email) return null;

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) return null;

    return {
      username: user.username,
      wallet_id: user.wallet_id,
      kycStatus: user.kycStatus,
      balances: user.balances || [],
    };
  } catch (err) {
    console.error('Server action error:', err);
    return null;
  }
};
