'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface FavoriteItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: FavoriteItem }
  | { type: 'REMOVE_FAVORITE'; payload: number };

type FavoritesContextType = {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
};

const initialState: FavoritesState = {
  items: []
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);
  const contextValue = { state, dispatch };
  
  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export { FavoritesProvider, useFavorites, type FavoriteItem };