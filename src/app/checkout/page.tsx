'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import GlobalApi from '@/api/GlobalApi';
import { useCart } from '@/context/UpdateCartContext';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [billingDetails, setBillingDetails] = useState({
    userName: '',
    email: '',
    address: '',
    phone: '',
    zip: '',
  });
  const router = useRouter();

  const { cartItems, setCartItems } = useCart();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [jwt, setJwt] = useState<string | null>('');
  const [user, setUser] = useState<string | null>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const jwt = window.sessionStorage.getItem('jwt');
      const user = window.sessionStorage.getItem('user');
      setUser(user);
      setJwt(jwt);
    }
    if (jwt === null) {
      router.push('/sign-in');
    }
    getCartItem();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(
      (p) => (total = total + p.attributes.products.data[0].attributes.pricing)
    );
    setSubTotal(total);
  }, [cartItems]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Billing Details:', billingDetails);
    console.log('Total Cart Amount:', subTotal);
  };

  const getCartItem = async () => {
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

  return (
    <div className='checkout-page container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='billing-details w-full lg:w-2/3'>
          <h2 className='text-xl font-semibold mb-4'>Billing Details</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                User Name:
              </label>
              <input
                type='text'
                name='firstName'
                value={billingDetails.userName}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Email:</label>
              <input
                type='email'
                name='email'
                value={billingDetails.email}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Address:</label>
              <input
                type='text'
                name='address'
                value={billingDetails.address}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Phone:</label>
              <input
                type='text'
                name='phone'
                value={billingDetails.phone}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                ZIP Code:
              </label>
              <input
                type='text'
                name='zip'
                value={billingDetails.zip}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Place Order
            </button>
          </form>
        </div>
        <div className='cart-total w-full lg:w-1/3'>
          <h2 className='text-xl font-semibold mb-4'>Total Cart Amount</h2>
          <p className='text-lg font-bold'>${subTotal.toFixed(2)}</p>
          <h2 className='text-xl font-semibold mb-4 mt-5'>Total Cart items</h2>
          <p className='text-lg font-bold'>{cartItems.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
