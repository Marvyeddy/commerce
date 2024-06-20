import GlobalApi from '@/api/GlobalApi';
import Image from 'next/image';
import { Product } from '../../types';
import ProductList from './ProductList';

const Products = async () => {
  const product: Product[] = await GlobalApi.getProducts();

  return (
    <div className='pt-7'>
      <div className='product_ctn'>
        {product.map((item, index) => {
          return <ProductList item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Products;
