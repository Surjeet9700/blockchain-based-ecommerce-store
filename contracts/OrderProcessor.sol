// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductManager.sol";

contract OrderProcessor {
    struct Order {
        uint256 id;
        address buyer;
        uint256[] productIds;
        uint256[] quantities;
        uint256 totalAmount;
        OrderStatus status;
        uint256 createdAt;
    }

    enum OrderStatus { Pending, Paid, Shipped, Delivered, Cancelled }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;
    ProductManager public productManager;

    event OrderCreated(uint256 orderId, address buyer, uint256 totalAmount);
    event OrderPaid(uint256 orderId);
    event OrderStatusUpdated(uint256 orderId, OrderStatus status);

    constructor(address _productManagerAddress) {
        productManager = ProductManager(_productManagerAddress);
    }

    function createOrder(uint256[] memory _productIds, uint256[] memory _quantities) public {
        require(_productIds.length > 0, "No products specified");
        require(_productIds.length == _quantities.length, "Product and quantity arrays must match");

        uint256 totalAmount = 0;
        
        for (uint256 i = 0; i < _productIds.length; i++) {
            (,, uint256 price,,,,uint256 stock,,bool isActive) = productManager.getProduct(_productIds[i]);
            require(isActive, "Product is not active");
            require(stock >= _quantities[i], "Insufficient stock");
            totalAmount += price * _quantities[i];
        }

        orderCount++;
        orders[orderCount] = Order(
            orderCount,
            msg.sender,
            _productIds,
            _quantities,
            totalAmount,
            OrderStatus.Pending,
            block.timestamp
        );

        emit OrderCreated(orderCount, msg.sender, totalAmount);
    }

    function payOrder(uint256 _orderId) public payable {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender, "Not the order owner");
        require(order.status == OrderStatus.Pending, "Order is not pending");
        require(msg.value == order.totalAmount, "Incorrect payment amount");

        order.status = OrderStatus.Paid;
        emit OrderPaid(_orderId);
    }

    function updateOrderStatus(uint256 _orderId, OrderStatus _status) public {
        Order storage order = orders[_orderId];
        require(order.id != 0, "Order does not exist");
        order.status = _status;
        emit OrderStatusUpdated(_orderId, _status);
    }

    function getOrder(uint256 _orderId) public view returns (
        uint256 id,
        address buyer,
        uint256[] memory productIds,
        uint256[] memory quantities,
        uint256 totalAmount,
        OrderStatus status,
        uint256 createdAt
    ) {
        Order memory order = orders[_orderId];
        return (
            order.id,
            order.buyer,
            order.productIds,
            order.quantities,
            order.totalAmount,
            order.status,
            order.createdAt
        );
    }
}