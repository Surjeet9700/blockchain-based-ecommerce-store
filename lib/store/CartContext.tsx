'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: calculateTotal([...state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )])
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: calculateTotal([...state.items, action.payload])
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: calculateTotal(state.items.filter(item => item.id !== action.payload))
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: calculateTotal(state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ))
      };
    case 'CLEAR_CART':
      return {
        items: [],
        total: '0'
      };
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): string => {
  return items.reduce((total, item) => {
    const itemTotal = BigInt(item.price) * BigInt(item.quantity);
    return (BigInt(total) + itemTotal).toString();
  }, '0');
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: '0' });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}