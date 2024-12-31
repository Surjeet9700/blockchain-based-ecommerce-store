import ProductClient from './ProductClient';
import { generateStaticParams } from '@/lib/generateStaticParams';

export { generateStaticParams };

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section>
      <ProductClient id={params.id} />
    </section>
  );
}