const Migrations = artifacts.require("Migrations");
const ProductManager = artifacts.require("ProductManager");
const OrderProcessor = artifacts.require("OrderProcessor");
const UserProfile = artifacts.require("UserProfile");

module.exports = async function(deployer) {
  // Deploy ProductManager first since OrderProcessor depends on it
  await deployer.deploy(ProductManager);
  
  // Deploy OrderProcessor with ProductManager address
  await deployer.deploy(OrderProcessor, ProductManager.address);
  
  // Deploy UserProfile
  await deployer.deploy(UserProfile);
};