'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/CartContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  stock: number;
  seller: string;
  isActive: boolean;
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { dispatch } = useCart();
  const { toast } = useToast();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform hover:scale-105"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">
                {parseFloat(product.price) / 1e18} ETH
              </span>
              <span className="text-sm text-muted-foreground">
                Stock: {product.stock}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 hover:bg-secondary/80"
            asChild
          >
            <Link href={`/product/${product.id}`}>
              View Details
            </Link>
          </Button>
          <Button
            className="flex-1 hover:bg-primary/90"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}