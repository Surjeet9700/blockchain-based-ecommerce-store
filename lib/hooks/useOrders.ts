import { useState, useEffect } from 'react';
import { getContract } from '@/lib/web3';
import OrderProcessorContract from '../../build/contracts/OrderProcessor.json';

export interface Order {
  id: number;
  buyer: string;
  productIds: number[];
  quantities: number[];
  totalAmount: string;
  status: number;
  createdAt: number;
}

export function useOrders(account: string | null) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadOrders();
    }
  }, [account]);

  const loadOrders = async () => {
    try {
      const contract = await getContract(OrderProcessorContract);
      const orderCount = await contract.methods.orderCount().call();
      
      const loadedOrders = [];
      for (let i = 1; i <= orderCount; i++) {
        const order = await contract.methods.getOrder(i).call();
        if (order.buyer.toLowerCase() === account?.toLowerCase()) {
          loadedOrders.push({
            id: parseInt(order.id),
            buyer: order.buyer,
            productIds: order.productIds.map((id: string) => parseInt(id)),
            quantities: order.quantities.map((q: string) => parseInt(q)),
            totalAmount: order.totalAmount,
            status: parseInt(order.status),
            createdAt: parseInt(order.createdAt)
          });
        }
      }
      setOrders(loadedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, refreshOrders: loadOrders };
}