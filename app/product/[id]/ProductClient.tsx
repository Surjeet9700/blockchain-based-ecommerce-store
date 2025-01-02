'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getContract } from '@/lib/web3';
import ProductManagerContract from '../../../build/contracts/ProductManager.json';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/lib/store/CartContext';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { Rating } from '@/components/Rating';
import { QuantitySelector } from '@/components/QuantitySelector';
import { ProductDetails } from '@/components/ProductDetails';
import { RelatedProducts } from '@/components/RelatedProducts';




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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { dispatch } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);



  const loadProduct = async () => {
    try {
      const contract = await getContract(ProductManagerContract);
      const productData = await contract.methods.getProduct(id).call();
      const loadedProduct = {
        id: parseInt(productData.id),
        name: productData.name,
        price: productData.price,
        category: productData.category,
        description: productData.description,
        image: productData.image,
        stock: parseInt(productData.stock),
        seller: productData.seller,
        isActive: productData.isActive
      };
      setProduct(loadedProduct);

      // Fetch related products
      const productCount = await contract.methods.productCount().call();
      const relatedProducts = [];
      for (let i = 1; i <= productCount; i++) {
        const relatedProductData = await contract.methods.getProduct(i).call();
        if (relatedProductData.isActive && relatedProductData.category === loadedProduct.category && relatedProductData.id !== loadedProduct.id) {
          relatedProducts.push({
            id: parseInt(relatedProductData.id),
            name: relatedProductData.name,
            price: relatedProductData.price,
            category: relatedProductData.category,
            description: relatedProductData.description,
            image: relatedProductData.image,
            stock: parseInt(relatedProductData.stock),
            seller: relatedProductData.seller,
            isActive: relatedProductData.isActive
          });
        }
      }
      setRelatedProducts(relatedProducts);
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
          quantity: quantity,
          image: product.image,
    
        }
      });
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to your cart.`
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageGallery images={[product.image]} alt={product.name} />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <Rating value={4.5} />
          <p className="text-2xl font-bold mt-4 mb-2">{parseFloat(product.price) / 1e18} ETH</p>
          <p className="text-sm text-muted-foreground mb-4">Stock: {product.stock}</p>
          <div className="flex items-center space-x-4 mb-6">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(prev => Math.min(prev + 1, product.stock))}
              onDecrease={() => setQuantity(prev => Math.max(prev - 1, 1))}
              max={product.stock}
            />
            <Button onClick={addToCart} disabled={product.stock === 0} className="flex-grow">
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
          <ProductDetails
            description={product.description}
            seller={product.seller}
            category={product.category}
          />
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}