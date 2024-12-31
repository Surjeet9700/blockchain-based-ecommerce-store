// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductManager {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string category;
        string description;
        string image;
        uint256 stock;
        address seller;
        bool isActive;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductCreated(uint256 id, string name, uint256 price, address seller);
    event ProductUpdated(uint256 id, string name, uint256 price, uint256 stock);
    event ProductDeleted(uint256 id);

    function createProduct(
        string memory _name,
        uint256 _price,
        string memory _category,
        string memory _description,
        string memory _image,
        uint256 _stock
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        require(_stock > 0, "Stock must be greater than 0");

        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            _category,
            _description,
            _image,
            _stock,
            msg.sender,
            true
        );

        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    function updateProduct(
        uint256 _id,
        string memory _name,
        uint256 _price,
        uint256 _stock
    ) public {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        require(products[_id].seller == msg.sender, "Only seller can update product");
        
        Product storage product = products[_id];
        product.name = _name;
        product.price = _price;
        product.stock = _stock;

        emit ProductUpdated(_id, _name, _price, _stock);
    }

    function deleteProduct(uint256 _id) public {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        require(products[_id].seller == msg.sender, "Only seller can delete product");
        
        products[_id].isActive = false;
        emit ProductDeleted(_id);
    }

    function getProduct(uint256 _id) public view returns (
        uint256 id,
        string memory name,
        uint256 price,
        string memory category,
        string memory description,
        string memory image,
        uint256 stock,
        address seller,
        bool isActive
    ) {
        Product memory product = products[_id];
        return (
            product.id,
            product.name,
            product.price,
            product.category,
            product.description,
            product.image,
            product.stock,
            product.seller,
            product.isActive
        );
    }
}