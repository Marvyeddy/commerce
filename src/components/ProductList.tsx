import Image from 'next/image';
import React from 'react';
import { Product } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProductDetail from './ProductDetail';
import { DialogTitle } from '@radix-ui/react-dialog';

export interface ItemProps {
  item: Product;
}

const ProductList = ({ item }: ItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='hover:scale-110 transition-all ease-in-out'>
          <div className='relative  h-[200px] rounded-t-md bg-gradient-to-b from-stone-500 to-white/35'>
            <Image
              src={item.attributes.image.data.attributes.url}
              alt=''
              fill
              className='object-contain cursor-pointer'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
          <div className='rounded-b-md px-2'>
            <h2 className='text-[15px] font-bold mb-1'>
              {item.attributes.title}
            </h2>
            <div className='flex justify-between items-center'>
              <h2 className='text-[15px] text-stone-500 font-semibold'>
                {item.attributes.categories.data[0].attributes.name}
              </h2>
              <h2 className='font-bold text-[14px]'>
                ${item.attributes.pricing}
              </h2>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <DialogDescription></DialogDescription>
          <ProductDetail item={item} />
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default ProductList;
