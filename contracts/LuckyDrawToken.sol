// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuckyDrawToken is ERC20 {
    uint256 private constant DEFAULT_TOKEN = 3 ether; // 가입시 받는 토큰
    
    struct Coupon {
        string name;// 쿠폰 이름
        string couponCode; // 쿠폰 코드
        string description; // 설명
        uint256 realPrice; // 원화 가치
        uint256 category; // 1,2,3
        address seller; // 등록자 주소
    }
    
    // 카테고리별 쿠폰 저장 
    mapping(uint256 => Coupon[]) public categoryItems;
    
    // 사용자별 당첨 쿠폰들
    mapping(address => Coupon[]) public userCoupons;

    // 가입 토큰 받았는지
    mapping(address => bool) public hasClaimedToken;
    
    event DefaultTokenClaimed(address indexed user, uint256 amount);
    event CouponAdded(address indexed seller, string name, uint256 category, uint256 realPrice, uint256 reward);
    event CouponWon(address indexed winner, string couponCode, string name, uint256 category);
    
    constructor() ERC20("LuckyDraw Token", "LDT") {
        _mint(msg.sender, 10 * 10 ** decimals()); // 배포자한테 토큰 10개
    }
    
    function claimDefaultToken() external {
        // 가입 토큰 받았는지 확인
        require(!hasClaimedToken[msg.sender], "Already token");
        hasClaimedToken[msg.sender] = true;
        _mint(msg.sender, DEFAULT_TOKEN);
        
        emit DefaultTokenClaimed(msg.sender, DEFAULT_TOKEN);
    }
    
    function addCoupon( string memory name,string memory couponCode,string memory description, uint256 realPrice ) external {
        // 가격에 따라 카테고리 자동 결정
        uint256 category = _getCategory(realPrice);
        // 새로운 쿠폰 등록
        Coupon memory newCoupon = Coupon({
            name: name,
            couponCode: couponCode,
            description: description,
            realPrice: realPrice,
            category: category,
            seller: msg.sender
        });
        
        categoryItems[category].push(newCoupon);
        
        // 등록자에게 토큰 보상 카테고리 가치만큼
        uint256 reward = category * 1 ether;
        _mint(msg.sender, reward);
        
        emit CouponAdded(msg.sender, name, category, realPrice, reward);
    }
    
    //랜덤 뽑기
    function drawCoupon(uint256 category) external {
        uint256 cost = category * 1 ether; 
        require(balanceOf(msg.sender) >= cost, "insuficient token");
        
        // 토큰 소각
        _burn(msg.sender, cost);
        
        // 랜덤 선택
        uint256 randomIndex = _random() % categoryItems[category].length;
        Coupon memory wonCoupon = categoryItems[category][randomIndex];
        
        // 사용자에게 쿠폰 지급
        userCoupons[msg.sender].push(wonCoupon);
        
        // 뽑힌 쿠폰 제거
        _removeCoupon(category, randomIndex);
        
        emit CouponWon(msg.sender, wonCoupon.couponCode, wonCoupon.name, category);
    }
    
    // 내가 당첨된 쿠폰
    function getMyCoupons() external view returns(Coupon[] memory) {
        return userCoupons[msg.sender];
    }
    
    // 카테고리별 쿠폰 개수
    function getCategoryCount(uint256 category) external view returns(uint256) {
        return categoryItems[category].length;
    }
    
    // 특정 카테고리의 모든 쿠폰 보기
    function getCategoryItems(uint256 category) external view returns(Coupon[] memory) {
        return categoryItems[category];
    }
    
    // 모든 카테고리 쿠폰 개수 한번에 조회
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
    
    // 가격에 따른 카테고리 결정
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
    
    // 랜덤 생성
    function _random() internal view returns(uint256) {
        return uint256(keccak256(abi.encodePacked( block.timestamp, block.prevrandao, msg.sender, block.number)));
    }
    
    // 뽑힌 쿠폰을 배열에서 제거
    function _removeCoupon(uint256 category, uint256 index) internal {
        Coupon[] storage pool = categoryItems[category];
        
        // 마지막 요소를 현재 위치로 이동 후 pop << 가스비 최적 절약 방법!! 
        pool[index] = pool[pool.length - 1];
        pool.pop();
    }
}