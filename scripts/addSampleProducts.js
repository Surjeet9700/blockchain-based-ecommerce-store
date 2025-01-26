const ProductManager = artifacts.require("ProductManager");

module.exports = async function (callback) {
  try {
    const productManager = await ProductManager.deployed();

    const sampleProducts = [
      {
        name: "Gaming Laptop",
        price: web3.utils.toWei("0.5", "ether"),
        category: "electronics",
        description: "High-performance gaming laptop with RTX 3080",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
        stock: 5,
      },
      {
        name: "Designer Watch",
        price: web3.utils.toWei("0.3", "ether"),
        category: "accessories",
        description: "Luxury designer watch with leather strap",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60",
        stock: 10,
      },
      {
        name: "Wireless Earbuds",
        price: web3.utils.toWei("0.1", "ether"),
        category: "electronics",
        description: "Premium wireless earbuds with noise cancellation",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        stock: 15,
      },
      {
        name: "Smart Watch",
        price: web3.utils.toWei("0.2", "ether"),
        category: "electronics",
        description: "Advanced smartwatch with health tracking",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60",
        stock: 8,
      },
      {
        name: "4K Ultra HD Television",
        price: web3.utils.toWei("0.8", "ether"),
        category: "electronics",
        description:
          "Experience stunning visuals with this 55-inch 4K Ultra HD television.",
        image:
          "https://images.unsplash.com/photo-1580897275296-87979517bd4c?w=500&auto=format&fit=crop&q=60",
        stock: 10,
      },
      {
        name: "Bluetooth Headphones",
        price: web3.utils.toWei("0.15", "ether"),
        category: "electronics",
        description:
          "Wireless headphones with noise-canceling feature and long battery life.",
        image:
          "https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?w=500&auto=format&fit=crop&q=60",
        stock: 20,
      },
      {
        name: "Smartphone",
        price: web3.utils.toWei("0.6", "ether"),
        category: "electronics",
        description:
          "Latest model smartphone with high-resolution camera and fast processor.",
        image:
          "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&auto=format&fit=crop&q=60",
        stock: 15,
      },
      {
        name: "Electric Kettle",
        price: web3.utils.toWei("0.05", "ether"),
        category: "home",
        description:
          "Quick-boil electric kettle with automatic shut-off feature.",
        image:
          "https://images.unsplash.com/photo-1647619124290-10fb9273b4b5?w=500&auto=format&fit=crop&q=60",
        stock: 25,
      },
      {
        name: "Coffee Grinder",
        price: web3.utils.toWei("0.07", "ether"),
        category: "home",
        description:
          "Adjustable coffee grinder for fresh ground coffee every time.",
        image:
          "https://images.unsplash.com/photo-1528884673118-9b6405d3fa69?w=500&auto=format&fit=crop&q=60",
        stock: 30,
      },
      {
        name: "Electric Toothbrush",
        price: web3.utils.toWei("0.1", "ether"),
        category: "home",
        description:
          "Rechargeable electric toothbrush with multiple brushing modes.",
        image:
          "https://images.unsplash.com/photo-1556281419-ab36e2d075d6?w=500&auto=format&fit=crop&q=60",
        stock: 20,
      },

      {
        name: "Running Shoes",
        price: web3.utils.toWei("0.12", "ether"),
        category: "clothing",
        description: "Comfortable running shoes with breathable mesh upper.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        stock: 15,
      },
      {
        name: "Winter Jacket",
        price: web3.utils.toWei("0.18", "ether"),
        category: "clothing",
        description: "Warm and waterproof winter jacket with insulated lining.",
        image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=500&auto=format&fit=crop&q=60",
        stock: 10,
      },
      {
        name: "Designer Handbag",
        price: web3.utils.toWei("0.5", "ether"),
        category: "accessories",
        description: "Luxury designer handbag made from premium leather.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60",
        stock: 5,
      },
      {
        name: "Sunglasses",
        price: web3.utils.toWei("0.08", "ether"),
        category: "accessories",
        description:
          "Stylish sunglasses with UV protection and polarized lenses.",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60",
        stock: 20,
      },
      {
        name: "Leather Wallet",
        price: web3.utils.toWei("0.1", "ether"),
        category: "accessories",
        description: "Genuine leather wallet with multiple card slots.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60",
        stock: 25,
      },
      {
        name: "Cookware Set",
        price: web3.utils.toWei("0.3", "ether"),
        category: "home",
        description: "Non-stick cookware set with various pot and pan sizes.",
        image: "https://images.unsplash.com/photo-1584447128309-b66b7a4d1b57?w=500&auto=format&fit=crop&q=60",
        stock: 10,
      },
      {
        name: "Smart Coffee Maker",
        price: web3.utils.toWei("0.15", "ether"),
        category: "home",
        description: "Programmable coffee maker with built-in grinder.",
        image: "https://images.unsplash.com/photo-1520970014086-2e35b0c0759b?w=500&auto=format&fit=crop&q=60",
        stock: 15,
      },
      {
        name: "Smart Speaker",
        price: web3.utils.toWei("0.2", "ether"),
        category: "electronics",
        description: "Voice-controlled smart speaker with assistant.",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&auto=format&fit=crop&q=60",
        stock: 20,
      },
      {
        name: "Digital Camera",
        price: web3.utils.toWei("0.4", "ether"),
        category: "electronics",
        description: "Mirrorless camera with 4K video.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60",
        stock: 8,
      },
      {
        name: "Premium Headphones",
        price: web3.utils.toWei("0.25", "ether"),
        category: "electronics",
        description: "Noise-cancelling wireless headphones.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        stock: 12,
      },
      {
        name: "Fitness Tracker",
        price: web3.utils.toWei("0.15", "ether"),
        category: "electronics",
        description: "Smart fitness band with heart rate monitor.",
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60",
        stock: 15,
      },
      {
        name: "Yoga Mat",
        price: web3.utils.toWei("0.05", "ether"),
        category: "fitness",
        description: "Non-slip exercise yoga mat with carrying strap.",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9b3?w=500&auto=format&fit=crop&q=60",
        stock: 25,
      },
      {
        name: "Mechanical Keyboard",
        price: web3.utils.toWei("0.12", "ether"),
        category: "electronics",
        description: "RGB mechanical gaming keyboard.",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60",
        stock: 10,
      },
      {
        name: "Gaming Mouse",
        price: web3.utils.toWei("0.08", "ether"),
        category: "electronics",
        description: "High-precision gaming mouse with programmable buttons.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60",
        stock: 20,
      },
    ];

    for (const product of sampleProducts) {
      await productManager.createProduct(
        product.name,
        product.price,
        product.category,
        product.description,
        product.image,
        product.stock
      );
      console.log(`Added product: ${product.name}`);
    }

    console.log("Sample products added successfully");
    callback();
  } catch (error) {
    console.error("Error adding sample products:", error);
    callback(error);
  }
};
