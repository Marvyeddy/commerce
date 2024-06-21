'use client';

import GlobalApi from '@/api/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { AiOutlineLoading } from 'react-icons/ai';

const signIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const jwt = window.sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signInUser(email, password)
      .then((resp) => {
        window.sessionStorage.setItem('user', JSON.stringify(resp.data.user));
        window.sessionStorage.setItem('jwt', resp.data.jwt);
        router.push('/');
        router.refresh();
        toast({
          title: 'Signed In successfully',
        });
        setLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        toast({
          title: error.response.data.error.message,
        });
        setLoader(false);
      });
  };

  return (
    <div className='absolute bg-white top-0 w-full z-50 h-screen'>
      <div className='w-[350px] sm:w-[500px] mx-auto flex flex-col items-center bg-slate-200 mt-20 p-7 gap-1'>
        <h2 className='font-bold text-xl'>
          MARV <span className='text-md font-bold text-red-400'>STORE</span>
        </h2>
        <h2 className='font-bold text-md'>Sign In</h2>
        <p className='text-stone-500 text-sm'>
          Fill the details below to sign-in.
        </p>

        <div className='sm:w-[400px] w-[300px] flex flex-col gap-5 mt-3'>
          <Input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={onSignIn} disabled={!(email && password)}>
            {loader ? <AiOutlineLoading className='animate-spin' /> : 'Sign-in'}
          </Button>
        </div>

        <div className='sm:flex gap-2 mt-3'>
          <p>Don't have an account?</p>
          <Link
            href={'/create-account'}
            className='text-blue-600 hover:underline'
          >
            Click to Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signIn;
