import Web3 from 'web3';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

let web3: Web3;

// Load environment variables
const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL || 'http://127.0.0.1:7545';
const expectedNetworkId = parseInt(process.env.NEXT_PUBLIC_NETWORK_ID || '5777', 10);

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(providerUrl);
  web3 = new Web3(provider);
}

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      console.error('User denied account access');
      return null;
    }
  } else {
    console.error('Please install MetaMask');
    return null;
  }
};

export const getContract = async (contractJson: any) => {
  const networkId = await web3.eth.net.getId();
  console.log(networkId)
  console.log(`Current Network ID: ${networkId}`);
  console.log('Expected Network ID:', expectedNetworkId);
  console.log('Available Networks:', contractJson.networks);

  

  const deployedNetwork = contractJson.networks[networkId];

  if (!deployedNetwork) {
    throw new Error('Contract not deployed to detected network');
  }

  return new web3.eth.Contract(
    contractJson.abi,
    deployedNetwork.address
  );
};

export default web3;
