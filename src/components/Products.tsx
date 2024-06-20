import GlobalApi from '@/api/GlobalApi';
import Image from 'next/image';
import { Product } from '../../types';

const Products = async () => {
  const product: Product[] = await GlobalApi.getProducts();

  return (
    <div>
      {product.map((item, index) => (
        <div key={index} className='relative w-[100px] h-[100px]'>
          <Image
            src={item.attributes.image.data.attributes.url}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
