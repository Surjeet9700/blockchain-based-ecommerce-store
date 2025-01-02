'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Store, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletModal } from '@/components/WalletModal';
import { connectWallet } from '@/lib/web3';
import { useCart } from '@/lib/store/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function Navbar() {
  const [account, setAccount] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleDisconnect = () => {
    // Implement wallet disconnection logic here
    setAccount(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">DApp Store</span>
            </Link>

            

            <div className="flex items-center space-x-4">
              {account ? (
                <>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <AnimatePresence>
                        {state.items.length > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center"
                          >
                            {state.items.length}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDisconnect}>
                        Disconnect Wallet
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-sm text-muted-foreground hidden md:inline-block">
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </span>
                </>
              ) : (
                <Button onClick={() => setShowWalletModal(true)}>
                  Connect Wallet
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b"
          >
          
          </motion.div>
        )}
      </AnimatePresence>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleConnect}
      />
    </>
  );
}

