import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className='bg-gradient-to-tr from-pink-700 to-purple-700 py-10 px-20 md:px-10'>
      <div className='max-w-screen-lg mx-auto flex items-center gap-12 flex-col-reverse md:flex-row '>
        <div className='w-[400px]'>
          <h2 className='md:text-7xl text-4xl text-center text-white mb-3'>
            SALES
          </h2>
          <p className='text-stone-400 px-4 text-center'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ullam
            voluptates reprehenderit iste aspernatur! Corrupti ut doloremque
            debitis, recusandae earum molestiae officiis? Dolor veniam
            recusandae optio voluptatum corporis a architecto non inventore
            commodi cupiditate.
          </p>
          <div className='mt-4 flex gap-4 justify-center'>
            <button className='border px-4 py-2 rounded-md text-white font-semibold hover:scale-110 ease-in-out'>
              Read More
            </button>
            <button className='border px-4 py-2 rounded-md bg-white font-semibold hover:scale-110 ease-in-out'>
              Learn More
            </button>
          </div>
        </div>

        <div className='right relative md:w-[400px] md:h-[500px] w-[300px] h-[400px]'>
          <Image
            src={'/banner-img.png'}
            alt=''
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
