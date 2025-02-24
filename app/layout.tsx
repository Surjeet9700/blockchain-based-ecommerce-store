import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/lib/store/CartContext';
import { FavoritesProvider } from '@/lib/store/useFavorites';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DApp E-commerce',
  description: 'Decentralized E-commerce Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}