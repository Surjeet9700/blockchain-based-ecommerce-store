import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Trash2, Plus } from 'lucide-react';

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', details: '**** **** **** 1234' },
    { id: 2, type: 'PayPal', details: 'user@example.com' },
  ]);
  const [newPaymentType, setNewPaymentType] = useState('');
  const [newPaymentDetails, setNewPaymentDetails] = useState('');

  const addPaymentMethod = () => {
    const newMethod = {
      id: paymentMethods.length + 1,
      type: newPaymentType,
      details: newPaymentDetails,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentType('');
    setNewPaymentDetails('');
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Payment Methods</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">Manage your payment methods here.</p>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{method.type}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{method.details}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removePaymentMethod(method.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add New Payment Method</h3>
        <div>
          <Label htmlFor="paymentType">Payment Type</Label>
          <Input
            id="paymentType"
            value={newPaymentType}
            onChange={(e) => setNewPaymentType(e.target.value)}
            placeholder="e.g., Credit Card, PayPal"
          />
        </div>
        <div>
          <Label htmlFor="paymentDetails">Payment Details</Label>
          <Input
            id="paymentDetails"
            value={newPaymentDetails}
            onChange={(e) => setNewPaymentDetails(e.target.value)}
            placeholder="e.g., **** **** **** 1234, user@example.com"
          />
        </div>
        <Button className="mt-2" onClick={addPaymentMethod}>
          <Plus className="mr-2 h-5 w-5" />
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}