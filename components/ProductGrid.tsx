import { useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types/product'
import { motion } from 'framer-motion'


interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredProduct(product.id)}
          onHoverEnd={() => setHoveredProduct(null)}
        >
          <ProductCard 
            product={product} 
            priority={index < 4}
            isHovered={hoveredProduct === product.id}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

