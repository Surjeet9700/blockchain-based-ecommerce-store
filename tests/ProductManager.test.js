const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductManager", function() {
    let ProductManager;
    let productManager;
    let owner;
    let buyer;

    const sampleProduct = {
        name: "Test Product",
        price: ethers.utils.parseEther("0.1"),
        category: "electronics",
        description: "Test product description",
        image: "https://test-image.jpg",
        stock: 10
    };

    beforeEach(async function() {
        ProductManager = await ethers.getContractFactory("ProductManager");
        [owner, buyer] = await ethers.getSigners();
        productManager = await ProductManager.deploy();
        await productManager.deployed();
    });

    describe("Product Creation", function() {
        it("Should create a new product successfully", async function() {
            await productManager.createProduct(
                sampleProduct.name,
                sampleProduct.price,
                sampleProduct.category,
                sampleProduct.description,
                sampleProduct.image,
                sampleProduct.stock
            );

            const product = await productManager.getProduct(1);
            expect(product.name).to.equal(sampleProduct.name);
            expect(product.price).to.equal(sampleProduct.price);
            expect(product.stock).to.equal(sampleProduct.stock);
            expect(product.isActive).to.equal(true);
        });

        it("Should emit ProductCreated event", async function() {
            await expect(productManager.createProduct(
                sampleProduct.name,
                sampleProduct.price,
                sampleProduct.category,
                sampleProduct.description,
                sampleProduct.image,
                sampleProduct.stock
            )).to.emit(productManager, "ProductCreated");
        });
    });

    describe("Product Updates", function() {
        beforeEach(async function() {
            await productManager.createProduct(
                sampleProduct.name,
                sampleProduct.price,
                sampleProduct.category,
                sampleProduct.description,
                sampleProduct.image,
                sampleProduct.stock
            );
        });

        it("Should update product details", async function() {
            const newName = "Updated Product";
            const newPrice = ethers.utils.parseEther("0.2");
            const newStock = 20;

            await productManager.updateProduct(1, newName, newPrice, newStock);
            const product = await productManager.getProduct(1);
            
            expect(product.name).to.equal(newName);
            expect(product.price).to.equal(newPrice);
            expect(product.stock).to.equal(newStock);
        });
    });

    describe("Product Deletion", function() {
        it("Should mark product as inactive when deleted", async function() {
            await productManager.createProduct(
                sampleProduct.name,
                sampleProduct.price,
                sampleProduct.category,
                sampleProduct.description,
                sampleProduct.image,
                sampleProduct.stock
            );

            await productManager.deleteProduct(1);
            const product = await productManager.getProduct(1);
            expect(product.isActive).to.equal(false);
        });
    });

    describe("Access Control", function() {
        it("Should only allow seller to update their product", async function() {
            await productManager.createProduct(
                sampleProduct.name,
                sampleProduct.price,
                sampleProduct.category,
                sampleProduct.description,
                sampleProduct.image,
                sampleProduct.stock
            );

            await expect(
                productManager.connect(buyer).updateProduct(
                    1,
                    "New Name",
                    ethers.utils.parseEther("0.2"),
                    15
                )
            ).to.be.revertedWith("Only seller can update product");
        });
    });
});