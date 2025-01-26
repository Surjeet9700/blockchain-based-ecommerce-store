import { useEffect, useState } from 'react';
import web3 from '@/lib/web3';

export function WalletTab({ account }) {
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    if (account) {
      fetchEthBalance();
    }
  }, [account]);

  const fetchEthBalance = async () => {
    if (account) {
      const balance = await web3.eth.getBalance(account);
      setEthBalance(parseFloat(web3.utils.fromWei(balance, 'ether')));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Wallet Balances</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full">
          <svg className="w-8 h-8 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">ETH Balance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{ethBalance} ETH</p>
        </div>
      </div>
    </div>
  );
}