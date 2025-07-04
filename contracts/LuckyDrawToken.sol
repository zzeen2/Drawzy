// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuckyDrawToken is ERC20 {
    uint256 private constant DEFAULT_TOKEN = 3 ether;
    
    struct Coupon {
        string name;
        string couponCode;
        string description;
        uint256 realPrice;
        uint256 category;
        address seller;
        uint256 timestamp;
    }
    
    mapping(uint256 => Coupon[]) public categoryItems;
    
    mapping(address => Coupon[]) public userCoupons;

    mapping(address => bool) public hasClaimedToken;
    
    Coupon[] public allRegisteredCoupons;
    
    uint256 public totalCouponsRegistered;
    uint256 public totalCouponsValue;
    
    event DefaultTokenClaimed(address indexed user, uint256 amount);
    event CouponAdded(address indexed seller, string name, uint256 category, uint256 realPrice, uint256 reward);
    event CouponWon(address indexed winner, string couponCode, string name, uint256 category);
    
    constructor() ERC20("LuckyDraw Token", "LDT") {
        _mint(msg.sender, 10 * 10 ** decimals());
    }
    
    function claimDefaultToken() external {
        require(!hasClaimedToken[msg.sender], "Already token");
        hasClaimedToken[msg.sender] = true;
        _mint(msg.sender, DEFAULT_TOKEN);
        
        emit DefaultTokenClaimed(msg.sender, DEFAULT_TOKEN);
    }
    
    function addCoupon( string memory name,string memory couponCode,string memory description, uint256 realPrice ) external {
        uint256 category = _getCategory(realPrice);
        Coupon memory newCoupon = Coupon({
            name: name,
            couponCode: couponCode,
            description: description,
            realPrice: realPrice,
            category: category,
            seller: msg.sender,
            timestamp: block.timestamp
        });
        
        categoryItems[category].push(newCoupon);
        
        allRegisteredCoupons.push(newCoupon);
        
        totalCouponsRegistered++;
        totalCouponsValue += realPrice;
        
        uint256 reward = category * 1 ether;
        _mint(msg.sender, reward);
        
        emit CouponAdded(msg.sender, name, category, realPrice, reward);
    }
    
    function drawCoupon(uint256 category) external {
        uint256 cost = category * 1 ether; 
        require(balanceOf(msg.sender) >= cost, "insuficient token");
        
        _burn(msg.sender, cost);
        
        uint256 randomIndex = _random() % categoryItems[category].length;
        Coupon memory wonCoupon = categoryItems[category][randomIndex];
        
        userCoupons[msg.sender].push(wonCoupon);
        
        _removeCoupon(category, randomIndex);
        
        emit CouponWon(msg.sender, wonCoupon.couponCode, wonCoupon.name, category);
    }
    
    function getMyCoupons() external view returns(Coupon[] memory) {
        return userCoupons[msg.sender];
    }
    
    function getCategoryCount(uint256 category) external view returns(uint256) {
        return categoryItems[category].length;
    }
    
    function getCategoryItems(uint256 category) external view returns(Coupon[] memory) {
        return categoryItems[category];
    }
    
    function getAllCategoryCount() external view returns(uint256, uint256, uint256, uint256, uint256, uint256) {
        return (
            categoryItems[1].length,
            categoryItems[2].length, 
            categoryItems[3].length,
            categoryItems[4].length,
            categoryItems[5].length,
            categoryItems[6].length
        );
    }
    
    function getAllRegisteredCoupons() external view returns(Coupon[] memory) {
        return allRegisteredCoupons;
    }
    
    function getTotalStats() external view returns(uint256, uint256) {
        return (totalCouponsRegistered, totalCouponsValue);
    }
    
    function getRecentCoupons(uint256 limit) external view returns(Coupon[] memory) {
        uint256 totalCount = allRegisteredCoupons.length;
        if (totalCount == 0) {
            return new Coupon[](0);
        }
        
        uint256 actualLimit = limit > totalCount ? totalCount : limit;
        Coupon[] memory recentCoupons = new Coupon[](actualLimit);
        
        for (uint256 i = 0; i < actualLimit; i++) {
            recentCoupons[i] = allRegisteredCoupons[totalCount - 1 - i];
        }
        
        return recentCoupons;
    }
    
    function _getCategory(uint256 realPrice) internal pure returns(uint256) {
        if (realPrice <= 5000) {
            return 1;
        } else if (realPrice <= 10000) {
            return 2;
        } else if (realPrice <= 15000) {
            return 3;
        } else if (realPrice <= 20000) {
            return 4;
        } else if (realPrice <= 25000) {
            return 5;
        } else {
            return 6;
        }
    }
    
    function _random() internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked( block.timestamp, block.prevrandao, msg.sender, block.number)));
    }
    
    function _removeCoupon(uint256 category, uint256 index) internal {
        Coupon[] storage pool = categoryItems[category];
        
        pool[index] = pool[pool.length - 1];
        pool.pop();
    }
}