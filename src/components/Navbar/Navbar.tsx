import { authModalState } from '@/atoms/AuthAtomModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
      setAuthModalState((prev) => ({ ...prev, isOpen: true }));
    }
  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
      <Link href='/' className='flex items-center justify-center h-20'>
        <Image width={150} height={50} src='/solveit-logo-full.png' alt='logo' />
      </Link>
      <div className='flex items-center'>
        <button className=' text-white px-2 py-1 sm:px-4 border-[#B13C3D] rounded-md text-sm font-medium hover:text-white  hover:bg-[#B13C3D] hover:border-1 hover:border-[#6d2a2b] border-2  transition duration-300 ease-in-out'
        onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Navbar;
