'use client';

import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Product } from '../../types';
import Image from 'next/image';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from './ui/button';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import Link from 'next/link';

interface CartButton {
  totalCartItem: number;
  cartItems: Product[];
  onDelete?: (id: number) => void;
}

const CartButton = ({ totalCartItem, cartItems, onDelete }: CartButton) => {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(
      (p) => (total = total + p.attributes.products.data[0].attributes.pricing)
    );
    setSubTotal(total);
  }, [cartItems]);

  return (
    <Sheet>
      <SheetTrigger className='flex items-center relative'>
        <FiShoppingCart size={20} />
        <span className='bg-white text-black rounded-[50%] px-2 text-[14px] absolute -right-4 -top-3'>
          {totalCartItem}
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetDescription></SheetDescription>
        <SheetTitle>
          {cartItems.length === 0 ? (
            <div className='w-max mx-auto flex items-center flex-col mt-[100%]'>
              <HiOutlineShoppingCart size={50} className='text-gray-500' />
              <div className='text-2xl mt-2 text-gray-400'>Empty cart</div>
            </div>
          ) : (
            <div className='h-[500px] overflow-auto mt-6'>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-1 mb-5 gap-3'
                >
                  <div className='flex gap-6 items-center'>
                    <Image
                      src={
                        item.attributes.products.data[0].attributes.image.data
                          .attributes.url
                      }
                      alt=''
                      width={90}
                      height={90}
                      className='border p-2 bg-slate-200'
                    />
                    <div>
                      <h2 className='font-bold '>
                        {item.attributes.products.data[0].attributes.title}
                      </h2>
                      <h2>Quantity: {item.attributes.quantity}</h2>
                      <h2 className='text-lg font-bold'>
                        ${item.attributes.products.data[0].attributes.pricing}
                      </h2>
                    </div>
                  </div>
                  <MdDeleteForever
                    size={25}
                    className='cursor-pointer hover:text-gray-300'
                  />
                </div>
              ))}
            </div>
          )}

          <div className='absolute bottom-6 w-[90%]'>
            <div className='flex justify-between'>
              <h2 className='text-[20px]'>SubTotal:</h2>
              <span className='font-bold'>${subTotal.toFixed(2)}</span>
            </div>
            <SheetClose asChild>
              <Link href={'/checkout'}>
                <button className='w-full mt-1 text-center text-white bg-blue-950 p-2 rounded hover:bg-blue-900'>
                  Checkout
                </button>
              </Link>
            </SheetClose>
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
