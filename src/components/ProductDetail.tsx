'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ItemProps } from './ProductList';
import { Button } from '@/components/ui/button';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/api/GlobalApi';
import { toast } from './ui/use-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { useCart } from '@/context/UpdateCartContext';

const ProductDetail = ({ item }: ItemProps) => {
  const [loader, setLoader] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { updateCart, setUpdateCart } = useCart();
  const jwt = window.sessionStorage.getItem('jwt');
  const router = useRouter();

  const user = sessionStorage.getItem('user');

  const totalPrice = (quantity * item.attributes.pricing).toFixed(2);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity <= 1 ? 1 : quantity - 1);
  };

  const addToCart = () => {
    setLoader(true);
    if (!jwt) {
      router.push('/sign-in');
      setLoader(false);
      return;
    }

    if (user) {
      const userObject = JSON.parse(user);
      const data = {
        data: {
          quantity: quantity,
          amount: totalPrice,
          products: item.id,
          users_permission_users: userObject.id,
          userId: userObject.id,
        },
      };

      GlobalApi.addToCart(data, jwt)
        .then((resp) => {
          toast({
            title: 'Added to Cart',
          });
          setUpdateCart(!updateCart);
          setLoader(false);
        })
        .catch((err) => {
          toast({
            title: 'Error while adding to cart',
          });
          setLoader(false);
        });
    } else {
      console.log('No user data found in sessionStorage.');
    }
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
        <h2 className='text-xl font-semibold'>${totalPrice}</h2>

        <div className='flex gap-3 items-center sm:justify-start justify-center my-3'>
          <button className='productDetail_btn' onClick={decrement}>
            -
          </button>
          <span>{quantity}</span>
          <button className='productDetail_btn' onClick={increment}>
            +
          </button>
        </div>

        <Button
          className='bg-slate-500 flex gap-2'
          onClick={addToCart}
          disabled={loader}
        >
          {loader ? (
            <AiOutlineLoading className='animate-spin' />
          ) : (
            <>
              <FaShoppingCart size={18} />
              <p>Add To Cart</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
