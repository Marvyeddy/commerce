import Category from '@/components/Category';
import Header from '@/components/Header';
import Products from '@/components/Products';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Header />
      <Products />
      <Category />
    </div>
  );
}
