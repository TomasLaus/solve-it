import React, { useEffect, useState } from 'react';

import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';

import { authModalState } from '@/atoms/AuthAtomModal';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <Image
            width={700}
            height={700}
            src='/hero.png'
            alt='hero image'
            // className='h-full pointer-events-auto'
          />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default AuthPage;
