import Image from 'next/image'
import Link from 'next/link'

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="relative aspect-square mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{parseFloat(product.price) / 1e18} ETH</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

