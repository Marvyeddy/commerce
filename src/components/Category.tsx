import GlobalApi from '@/api/GlobalApi';
import Image from 'next/image';
import { Product } from '../../types';
import Link from 'next/link';

const Category = async () => {
  const category: Product[] = await GlobalApi.getCategories();
  return (
    <div>
      <div className=' w-max gap-7 grid sm:grid-cols-4 grid-cols-2  mx-auto mt-6 '>
        {category.map((item, index) => (
          <Link
            className='category_ctn'
            key={index}
            href={`/product-category/${item.attributes.name}`}
          >
            <Image
              src={item.attributes.icon.data[0].attributes.url}
              alt=''
              fill
              priority
              className='object-contain cursor-pointer -z-20'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <h2 className='font-bold text-white/50 text-center text-[14px] my-8'>
              {item.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
