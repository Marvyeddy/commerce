import Category from '@/components/Category';
import Products from '@/components/Products';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Products />
      <Category />
    </div>
  );
}
