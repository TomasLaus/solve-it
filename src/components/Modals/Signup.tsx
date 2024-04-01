import { authModalState } from '@/atoms/AuthAtomModal';

import React, { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { auth, firestore } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: '',
    displayName: '',
    password: '',
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName)
      return alert('Please fill all fields');
    try {
      toast.loading('Creating your account', {
        position: 'top-center',
        toastId: 'loadingToast',
        theme: 'dark',
      });
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, 'users', newUser.user.uid), userData);
      router.push('/');
    } catch (error: any) {
      toast.error(error.message, { position: 'top-center', theme: 'dark' });
    } finally {
      toast.dismiss('loadingToast');
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
      <h3 className='text-xl font-medium text-white'>Register to Solve It</h3>
      <div>
        <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type='email'
          name='email'
          id='email'
          className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
          placeholder='name@company.com'
        />
      </div>
      <div>
        <label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type='displayName'
          name='displayName'
          id='displayName'
          className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    '
          placeholder='John Doe'
        />
      </div>
      <div>
        <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type={isPasswordVisible ? 'text' : 'password'}
          name='password'
          id='password'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='Password'
        />
        <button
          className='absolute top-[68%] right-5 flex items-center px-4 text-white hover:text-gray-300'
          onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          )}
        </button>
      </div>

      <button
        type='submit'
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        '>
        {loading ? 'Loading...' : 'Register'}
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Already have an account?{' '}
        <a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick('login')}>
          Log In
        </a>
      </div>
    </form>
  );
};
export default Signup;
