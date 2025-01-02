'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { getContract } from '@/lib/web3';
import ProductManagerContract from '../build/contracts/ProductManager.json';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';


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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'electronics', 'clothing', 'books', 'home'];

  useEffect(() => {
    loadProducts();
  }, []);



  const loadProducts = async () => {
    try {
      const contract = await getContract(ProductManagerContract);
      const productCount = await contract.methods.productCount().call();
      
      const loadedProducts = [];
      for (let i = 1; i <= productCount; i++) {
        const product = await contract.methods.getProduct(i).call();
        if (product.isActive) {
          loadedProducts.push({
            id: parseInt(product.id),
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
            stock: parseInt(product.stock),
            seller: product.seller,
            isActive: product.isActive
          });
        }
      }
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted aspect-square rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Discover Products</h1>
          <div className="mb-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div> 
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index === 0}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-muted-foreground">
              No products found in this category
            </h2>
          </motion.div>
        )}
      </div>
    </div>
  );
}