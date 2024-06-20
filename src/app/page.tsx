import Category from '@/components/Category';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <Products />
    </div>
  );
}
