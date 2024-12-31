'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getContract } from '@/lib/web3';
import OrderProcessorContract from '../../build/contracts/OrderProcessor.json';
import web3 from '@/lib/web3';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        toast({
          title: 'Error',
          description: 'Please connect your wallet first',
          variant: 'destructive',
        });
        return;
      }

      const contract = await getContract(OrderProcessorContract);
      
      // Create arrays for product IDs and quantities
      const productIds = state.items.map(item => item.id);
      const quantities = state.items.map(item => item.quantity);

      // Create order
      await contract.methods
        .createOrder(productIds, quantities)
        .send({ from: account });

      // Pay for order
      const orderCount = await contract.methods.orderCount().call();
      await contract.methods
        .payOrder(orderCount)
        .send({ from: account, value: state.total });

      toast({
        title: 'Success',
        description: 'Order placed successfully!',
      });

      // Clear cart and redirect to orders page
      dispatch({ type: 'CLEAR_CART' });
      router.push('/profile/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process the order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-card p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {parseFloat(item.price) * item.quantity / 1e18} ETH
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{parseFloat(state.total) / 1e18} ETH</span>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  );
}