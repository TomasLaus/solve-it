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
import home4 from '../../../public/home-4.png';
import home2 from '../../../public/home-2.jpg';
import home3 from '../../../public/home-3.png';

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
    <div className='bg-[#1D1D21] animate-fadeIn'>
    <Navbar />
  
    <div className='max-w-7xl mx-auto px-4 py-12 md:py-24 text-[22px] '>
      <div className='text-white text-center mb-12'>
        <h1 className='font-bold mb-4'>Achieve mastery through challenge</h1>
        <p className='mb-8'>
          Improve your development skills by training with code problems that challenge you and
          push your programming portfolio.
        </p>
        <button className='bg-[#B13C3D] hover:bg-[#a74244] text-white font-bold py-2 px-4 rounded transition ease-in-out'>
          Start now
        </button>
      </div>
  
      <div className='grid grid-cols-1 md:grid-cols-1 gap-8 text-[32px]'>
        {/* Sección de afilar habilidades de codificación */}
        <div className='bg-red-500 py-7 rounded-lg flex flex-col justify-center items-center'>
          <div className='p-5'>
            <h2 className='font-semibold mb-2'>Sharpen your coding skills</h2>
            <p>
              With small coding exercises designed to help you learn different aspects of software
              development.
            </p>
          </div>
          <div>
            <Image src={home4} width={500} alt='problem solving' className='rounded' />
          </div>
        </div>
      </div>
  
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-white '>
        {/* Sección de retroalimentación instantánea */}
        <div className='bg-[#92909015] p-4 rounded-lg flex flex-col justify-center items-center'>
          <div className='p-5'>
            <h2 className='text-xl font-semibold mb-2'>Get instant feedback</h2>
            <p>
              Solve problems with your own coding style directly in the browser and get real-time
              test results.
            </p>
          </div>
          <div>
            <Image src={home2} width={500} alt='problem solving' className='rounded' />
          </div>
        </div>
        {/* Sección de ganar rangos y honor */}
        <div className='bg-[#92909015] p-4 rounded-lg flex flex-col justify-center items-center'>
          <div className='p-5'>
            <h2 className='text-xl font-semibold mb-2'>Earn ranks and honor</h2>
            <p>The code challenges are graded from beginner to expert level.</p>
          </div>
          <div>
            <Image src={home3} width={550} alt='problem solving' className='rounded removebg'/>
          </div>
        </div>
      </div>
    </div>
  
    {authModal.isOpen && <AuthModal />}
  </div>
  
  );
};
export default AuthPage;
