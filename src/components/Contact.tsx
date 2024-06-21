import React from 'react';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className='bg-contact-bg bg-cover bg-center bg-no-repeat mt-7 px-2 py-32'>
      <div className='max-w-screen-md mx-auto flex-col flex items-center gap-2'>
        <h2 className='text-lg font-semibold'>CONTACT US HERE</h2>
        <p className='text-center md:text-left'>
          Every Information Given to us is protected with priority
        </p>
        <div>
          <input
            type='text'
            className='bg-stone-300 rounded-md py-1 px-2 w-[200px]'
          />
          <button className='ml-1 bg-gradient-to-tr from-purple-700 to-pink-600 text-white px-3 py-1 rounded-md'>
            Subscribe
          </button>
        </div>
        <div className='flex gap-3'>
          <FaFacebook size={24} />
          <FaXTwitter size={24} />
          <FaInstagram size={24} />
          <FaDiscord size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
