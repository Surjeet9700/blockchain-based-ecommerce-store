// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    struct User {
        address userAddress;
        string name;
        string email;
        uint256[] orderIds;
        bool isRegistered;
    }

    mapping(address => User) public users;
    
    event UserRegistered(address userAddress, string name);
    event UserUpdated(address userAddress, string name, string email);
    event OrderAdded(address userAddress, uint256 orderId);

    function registerUser(string memory _name, string memory _email) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        users[msg.sender] = User(
            msg.sender,
            _name,
            _email,
            new uint256[](0),
            true
        );
        
        emit UserRegistered(msg.sender, _name);
    }

    function updateProfile(string memory _name, string memory _email) public {
        require(users[msg.sender].isRegistered, "User not registered");
        
        User storage user = users[msg.sender];
        user.name = _name;
        user.email = _email;
        
        emit UserUpdated(msg.sender, _name, _email);
    }

    function addOrder(uint256 _orderId) public {
        require(users[msg.sender].isRegistered, "User not registered");
        
        users[msg.sender].orderIds.push(_orderId);
        emit OrderAdded(msg.sender, _orderId);
    }

    function getProfile() public view returns (
        address userAddress,
        string memory name,
        string memory email,
        uint256[] memory orderIds,
        bool isRegistered
    ) {
        User memory user = users[msg.sender];
        return (
            user.userAddress,
            user.name,
            user.email,
            user.orderIds,
            user.isRegistered
        );
    }

    function getOrderHistory() public view returns (uint256[] memory) {
        require(users[msg.sender].isRegistered, "User not registered");
        return users[msg.sender].orderIds;
    }
}