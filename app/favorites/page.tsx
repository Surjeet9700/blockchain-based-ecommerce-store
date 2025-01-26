'use client';

import { useFavorites } from '@/lib/store/useFavorites';
import { ProductCard } from '@/components/ProductCard';

export default function FavoritesPage() {
  const { state } = useFavorites();

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
        <p className="text-muted-foreground">Add products to your favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}