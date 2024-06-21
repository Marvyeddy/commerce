'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdCancel } from 'react-icons/md';
import CartButton from './CartButton';
import { useCart } from '@/context/UpdateCartContext';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/api/GlobalApi';
import { Product } from '../../types';
import { toast } from './ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const jwt = window.sessionStorage.getItem('jwt');
      setIsLoggedIn(!!jwt);
    }
  }, []);

  useEffect(() => {
    getCartItem();
  }, [updateCart]);

  const getCartItem = async () => {
    const user = window.sessionStorage.getItem('user');
    const jwt = window.sessionStorage.getItem('jwt');

    if (user && jwt) {
      const userObject = JSON.parse(user);
      const cartItemsList: Product[] = await GlobalApi.getCartItems(
        userObject.id,
        jwt
      );
      setCartItems(cartItemsList);
      setTotalCartItem(cartItemsList.length);
    } else {
      console.log('No user data found in sessionStorage.');
    }
  };

  const logOut = () => {
    window.sessionStorage.clear();
    router.push('/sign-in');
  };

  const onDelete = (id: number) => {
    const jwt = window.sessionStorage.getItem('jwt');
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast({
        title: 'Item deleted',
      });
      getCartItem();
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className='bg-black text-white sticky top-0 right-0 z-10 py-4 px-7 w-screen'>
        <div className='flex justify-between max-w-screen-lg mx-auto items-center '>
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
            <CartButton
              totalCartItem={totalCartItem}
              cartItems={cartItems}
              onDelete={onDelete}
            />

            {!isLoggedIn ? (
              <Link className='nav_login' href={'/sign-in'}>
                Login
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaUser />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Order</DropdownMenuItem>
                  <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button className='md:hidden block' onClick={handleOpen}>
              <GiHamburgerMenu size={25} />
            </button>
          </div>
          {/* mobile nav */}
        </div>
      </div>
      <div
        className={`fixed h-auto top-0 bottom-0 left-0 w-[100%] bg-slate-200 flex flex-col transition-all ease-in-out md:hidden z-50
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
          {!isLoggedIn && (
            <Link
              href={'/sign-in'}
              className='text-black w-max border border-black px-4 py-1 rounded-md'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
