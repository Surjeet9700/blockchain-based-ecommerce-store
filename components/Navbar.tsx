'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletModal } from '@/components/WalletModal';
import { connectWallet } from '@/lib/web3';
import { useCart } from '@/lib/store/CartContext';

export function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    setIsClient(true);
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    const connectedAccount = await connectWallet();
    setAccount(connectedAccount);
  };

  const handleConnect = async () => {
    const connectedAccount = await connectWallet();
    setAccount(connectedAccount);
    setShowWalletModal(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-6 w-6" />
              <span className="font-bold text-xl">DApp Store</span>
            </Link>

            <div className="flex items-center space-x-4">
              {account ? (
                <>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {state.items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                          {state.items.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </span>
                </>
              ) : (
                <Button onClick={() => setShowWalletModal(true)}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleConnect}
      />
    </>
  );
}