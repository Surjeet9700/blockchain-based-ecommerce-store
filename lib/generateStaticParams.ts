import { getContract } from '@/lib/web3';
import ProductManagerContract from '@/build/contracts/ProductManager.json';

export async function generateStaticParams() {
  try {
    const contract = await getContract(ProductManagerContract);
    const productCount = await contract.methods.productCount().call();

    const params = [];
    for (let i = 1; i <= productCount; i++) {
      params.push({
        id: i.toString()
      });
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}