'use server';

import { connectToDB } from '@/lib/connectDB';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function signupAction(prevState, formData) {
  try {
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!username || !email || !password) {
      return { status: 'error', message: 'All fields are required.' };
    }

    await connectToDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return { status: 'error', message: 'Email already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return { status: 'success', message: 'Account created successfully.' };
  } catch (error) {
    console.error('Signup error:', error);
    return { status: 'error', message: 'Something went wrong. Try again.' };
  }
}
