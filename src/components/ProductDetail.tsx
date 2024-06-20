'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ItemProps } from './ProductList';
import { Button } from '@/components/ui/button';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetail = ({ item }: ItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity <= 1 ? 1 : quantity - 1);
  };

  return (
    <div className='productDetail_ctn'>
      <div>
        <Image
          src={item.attributes.image.data.attributes.url}
          alt=''
          width={250}
          height={250}
          loading='lazy'
          className='object-contain bg-slate-300 rounded-lg'
        />
      </div>
      <div className='flex flex-col gap-1 sm:text-left text-center'>
        <h2 className='text-lg font-bold'>{item.attributes.title}</h2>
        <h2 className='text-sm text-gray-500'>{item.attributes.description}</h2>
        <h2 className='text-xl font-semibold'>${item.attributes.pricing}</h2>

        <div className='flex gap-3 items-center sm:justify-start justify-center my-3'>
          <button className='productDetail_btn' onClick={decrement}>
            -
          </button>
          <span>{quantity}</span>
          <button className='productDetail_btn' onClick={increment}>
            +
          </button>
        </div>

        <Button className='bg-slate-500 flex gap-2'>
          <FaShoppingCart size={18} />
          <p>Add To Cart</p>
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
