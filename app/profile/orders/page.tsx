'use client';

import { useState, useEffect } from 'react';
import { useOrders } from '@/lib/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';
import web3 from '@/lib/web3';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileSidebar } from '@/components/ProfileSidebar';

const ORDER_STATUS = [
  'Pending',
  'Paid',
  'Shipped',
  'Delivered',
  'Cancelled'
];

const STATUS_COLORS = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Paid: 'bg-green-200 text-green-800',
  Shipped: 'bg-blue-200 text-blue-800',
  Delivered: 'bg-purple-200 text-purple-800',
  Cancelled: 'bg-red-200 text-red-800',
};

export default function OrdersPage() {
  const [account, setAccount] = useState<string | null>(null);
  const { orders, loading } = useOrders(account);

  useEffect(() => {
    checkAccount();
  }, []);

  const checkAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  if (!account) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <h2 className="text-2xl font-semibold mb-4">Please connect your wallet</h2>
        <Button onClick={checkAccount}>Connect Wallet</Button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <ProfileSidebar />
        </aside>
        <main className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-8 w-8" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
                  <Button onClick={() => window.location.href = '/'}>Start Shopping</Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-card p-6 rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md border border-border"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt * 1000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">
                            {parseFloat(order.totalAmount) / 1e18} ETH
                          </p>
                          <span className={`text-sm px-3 py-1 rounded-full ${STATUS_COLORS[ORDER_STATUS[order.status] as keyof typeof STATUS_COLORS]}`}>
                            {ORDER_STATUS[order.status]}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4 bg-background/50 p-4 rounded-md">
                        {order.productIds.map((productId, index) => (
                          <div key={productId} className="flex justify-between text-sm">
                            <span className="font-medium">Product #{productId}</span>
                            <span>Quantity: {order.quantities[index]}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

