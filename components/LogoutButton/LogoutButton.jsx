'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // If you're using NextAuth, call signOut()
    router.push('/login');
    toast.success('Logged out');
  };

  return (
    <div className="flex justify-center mt-8">
      <Button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-md"
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
