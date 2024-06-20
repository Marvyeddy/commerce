import GlobalApi from '@/api/GlobalApi';
import Category from '@/components/Category';
import React from 'react';
import { Product } from '../../../../../types';
import ProductList from '@/components/ProductList';

const productCategory = async ({ params }: any) => {
  const productList: Product[] = await GlobalApi.categoryFilter(
    params.categoryName
  );
  return (
    <div className='min-h-[90vh]'>
      <h1 className='bg-gradient-to-tr from-stone-500 to-black p-4 text-center text-white font-bold text-2xl'>
        {params.categoryName}
      </h1>
      <Category />
      <div className='product_ctn mt-12'>
        {productList.map((item, index) => {
          return <ProductList item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default productCategory;
