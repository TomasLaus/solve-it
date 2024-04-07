import React, { useEffect, useState } from 'react';

import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';

import { authModalState } from '@/atoms/AuthAtomModal';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);

  const [pageLoading, setPageLoading] = useState(true);

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (user) router.push('/');
    if (!user && !loading) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative animate-fadeIn'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)]'>
          <div className='text-center text-white'>
            <h1 className='text-4xl font-bold mb-4'>
            Welcome to your problem-solving platform!
            </h1>
            <p className='text-lg mb-8'>
            Practice your problem solving skills with challenging algorithms and improve your programming logic.
            </p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105">
              Start now
            </Link>
          </div>
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default AuthPage;
