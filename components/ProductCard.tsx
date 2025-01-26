import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/CartContext';
import { useFavorites } from '@/lib/store/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShoppingCart, Heart } from 'lucide-react';

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
  isHovered?: boolean;
}

export function ProductCard({ product, priority = false, isHovered = false }: ProductCardProps) {
  const { dispatch } = useCart();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(favoritesState.items.some(item => item.id === product.id));

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

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesDispatch({ type: 'REMOVE_FAVORITE', payload: product.id });
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`
      });
    } else {
      favoritesDispatch({
        type: 'ADD_FAVORITE',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      });
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2"
                >
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/product/${product.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" onClick={addToCart} disabled={product.stock === 0}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 transition-colors"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
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