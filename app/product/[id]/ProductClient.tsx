'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getContract } from '@/lib/web3';
import ProductManagerContract from '../../../build/contracts/ProductManager.json';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/lib/store/CartContext';

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

export default function ProductClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { dispatch } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const contract = await getContract(ProductManagerContract);
      const productData = await contract.methods.getProduct(id).call();
      setProduct({
        id: parseInt(productData.id),
        name: productData.name,
        price: productData.price,
        category: productData.category,
        description: productData.description,
        image: productData.image,
        stock: parseInt(productData.stock),
        seller: productData.seller,
        isActive: productData.isActive
      });
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const addToCart = () => {
    if (product) {
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
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const priority = product.stock === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold">{parseFloat(product.price) / 1e18} ETH</span>
            <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
          </div>
          <Button onClick={addToCart} disabled={product.stock === 0}>
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}