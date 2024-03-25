import React, { useEffect, useState } from 'react';

import { authModalState } from '@/atoms/AuthAtomModal';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) return alert('Please fill in all fields');
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    if (error?.message === 'Firebase: Error (auth/user-not-found).')
      return alert('User not found.');
    if (error?.message === 'Firebase: Error (auth/invalid-credential).')
      return alert('Invalid credentials.');
  }, [error]);

  return (
    <form className='space-y-6 px-6 pb-4' onSubmit={handleLogin}>
      <h3 className='text-xl font-medium text-white'>Sign in to Solve It</h3>
      <div>
        <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
          Your Email
        </label>
        <input
          onChange={handleInputChange}
          type='email'
          name='email'
          id='email'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='name@comapany.com'
        />
      </div>
      <div>
        <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
          Your Password
        </label>
        <input
          onChange={handleInputChange}
          type={isPasswordVisible ? 'text' : 'password'}
          name='password'
          id='password'
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='Password'
        />
        <button
          className='absolute inset-y-0 top-12 right-5 flex items-center px-4 text-white hover:text-gray-300'
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
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
        {loading ? 'Loading...' : 'Log In'}
      </button>

      <button className='flex w-full justify-end' onClick={() => handleClick('forgotPassword')}>
        <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
          Forgot Password?
        </a>
      </button>

      <div className='text-sm font-medium text-gray-300'>
        Not Registered?{' '}
        <a
          href='#'
          className='text-blue-700 hover:underline'
          onClick={() => handleClick('register')}>
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
