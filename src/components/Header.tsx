'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdCancel } from 'react-icons/md';
import CartButton from './CartButton';
import { useCart } from '@/context/UpdateCartContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='bg-black text-white sticky top-0 z-10 py-4 px-7'>
      <div className='flex justify-between max-w-screen-lg mx-auto items-center'>
        <div className='md:flex gap-5 hidden'>
          <div className='hover:underline underline-offset-4'>
            <Link href={'/'}>Home</Link>
          </div>
          <div className='hover:underline underline-offset-4'>
            <Link href={'/'}>Contact</Link>
          </div>
          <div className='hover:underline underline-offset-4'>
            <Link href={'/'}>Products</Link>
          </div>
        </div>

        <Link className='cursor-pointer' href={'/'}>
          <h2 className='font-bold'>
            MARV <span className='text-md font-bold text-red-400'>STORE</span>
          </h2>
        </Link>

        <div className='right flex gap-8 items-center'>
          <CartButton totalCartItem={totalCartItem} cartItems={cartItems} />

          <Link className='nav_login' href={'/sign-in'}>
            Login
          </Link>

          <button className='md:hidden block' onClick={handleOpen}>
            <GiHamburgerMenu size={25} />
          </button>
        </div>
        {/* mobile nav */}
        <div
          className={`fixed min-h-[100vh] top-0 left-0 w-[100%] bg-slate-200 flex flex-col transition-all ease-in-out md:hidden
          ${isOpen ? `translate-x-0` : `-translate-x-full`}`}
        >
          <MdCancel
            color='black'
            size={25}
            className='absolute right-8 top-6 cursor-pointer'
            onClick={handleClose}
          />
          <div className='text-black flex flex-col mx-auto items-center mt-36 gap-4'>
            <Link href={'#'}>Home</Link>
            <Link href={'#'}>Products</Link>
            <Link href={'#'}>Contact</Link>{' '}
            <Link
              href={'/sign-in'}
              className='text-black w-max border border-black px-4 py-1 rounded-md'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
