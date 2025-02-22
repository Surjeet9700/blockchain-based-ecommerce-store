

# Blockchain Based Ecommerce Store

A decentralized ecommerce store that leverages blockchain technology to provide secure, transparent, and trustless transactions. This project integrates smart contracts for handling payments and order processing, an optional backend for off-chain services, and a modern web frontend for user interaction.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
  - [Blockchain Layer (Smart Contracts)](#blockchain-layer-smart-contracts)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation & Setup](#installation--setup)
  - [Prerequisites](#prerequisites)
  - [Smart Contract Deployment](#smart-contract-deployment)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Blockchain Based Ecommerce Store is designed to offer a decentralized alternative to traditional ecommerce platforms. By using blockchain smart contracts, the platform ensures that all transactions—payments, order processing, and product authenticity—are securely recorded on an immutable ledger. The user-friendly frontend interacts with these smart contracts via a Web3 provider (e.g., MetaMask), while an optional backend can handle additional off-chain functionalities such as user management and analytics.

## Features

- **Decentralized Transactions:** Secure payments and order processing using blockchain smart contracts.
- **Transparency:** Immutable transaction records on the blockchain ensure trust and auditability.
- **User-Friendly Interface:** A modern web application that interacts seamlessly with the blockchain.
- **Wallet Integration:** Connect your blockchain wallet (e.g., MetaMask) to make purchases.
- **Optional Backend Services:** Extend functionality with traditional server-side APIs for non-critical operations.

## Architecture

The project is structured into three layers:

### Blockchain Layer (Smart Contracts)

- **Smart Contracts:** Developed in Solidity, these contracts handle:
  - Product listing and management.
  - Secure payment processing.
  - Order tracking and fulfillment.
- **Deployment:** The contracts are deployed on an EVM-compatible network (e.g., a local development network, Ethereum testnet, or mainnet).
- **Interaction:** The frontend interacts with the contracts using libraries like [ethers.js](https://docs.ethers.io/) or [Web3.js](https://web3js.readthedocs.io/).

### Backend

*(Optional – for additional off-chain features)*

- **API Server:** Built using Node.js (e.g., Express.js) to handle tasks such as user authentication, logging, and analytics.
- **Database:** Manages non-critical data like user profiles and session information.
- **Integration:** Listens to blockchain events and relays transaction statuses to the frontend.

### Frontend

- **Modern UI:** Developed with a JavaScript framework (e.g., React or Vue) to provide an intuitive interface.
- **Web3 Integration:** Connects to the blockchain through a Web3 provider to read data from and send transactions to the smart contracts.
- **Responsive Design:** Ensures usability across devices.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A blockchain wallet (e.g., [MetaMask](https://metamask.io/))
- A Solidity development framework such as [Truffle](https://www.trufflesuite.com/) (this project uses Truffle)

### Smart Contract Deployment

1. **Navigate to the Contracts Directory**
   ```bash
   cd contracts
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Deploy the Smart Contracts and Add Sample Products**

   Execute the following commands:
   ```bash
   rm -rf build
   truffle compile
   truffle migrate --network development
   truffle exec scripts/addSampleProducts.js --network development
   ```
   - **Explanation:**
     - `rm -rf build`: Removes any previous build artifacts.
     - `truffle compile`: Compiles the Solidity smart contracts.
     - `truffle migrate --network development`: Deploys the compiled contracts to the development network.
     - `truffle exec scripts/addSampleProducts.js --network development`: Executes a script to add sample products to the deployed contracts.

### Backend Setup

*(Skip this section if the project does not include a backend API)*

1. **Navigate to the Backend Directory**
   ```bash
   cd ../backend
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Create Environment Variables**
   - Create a `.env` file and configure the required settings (e.g., `PORT`, `DATABASE_URL`).
4. **Start the Backend Server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd ../frontend
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure Web3 Provider**
   - Update the contract addresses and ABI files as needed for your deployment.
4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   - By default, the frontend will run on [http://localhost:3000](http://localhost:3000) (or on another configured port).

## Usage

- **Connect Your Wallet:**
  - Open the frontend in your browser and connect your blockchain wallet (e.g., via MetaMask).
- **Browse Products:**
  - View products as fetched from the smart contract.
- **Make a Purchase:**
  - Select a product, confirm the transaction in your wallet, and complete the purchase.
- **Track Orders:**
  - Monitor order status via events emitted by the smart contracts.
- **Additional Features:**
  - If a backend is implemented, use additional functionalities like user account management and order history.



## License

This project is licensed under the [MIT License](./LICENSE).

---


