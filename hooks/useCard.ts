import { Product } from '@/types/product'
import { useState, useEffect } from 'react'


export function useCart() {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  return { cartItems, addToCart, removeFromCart }
}

