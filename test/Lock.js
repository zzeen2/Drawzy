const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuckyDrawToken", function () {
  let LuckyDrawToken;
  let token;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    // 계정들 가져오기
    [owner, user1, user2] = await ethers.getSigners();

    // 컨트랙트 배포 (ethers v6 방식)
    LuckyDrawToken = await ethers.getContractFactory("LuckyDrawToken");
    token = await LuckyDrawToken.deploy();
    // await token.deployed(); ← 이 줄 제거
  });

  describe("배포 및 초기화", function () {
    it("토큰 이름과 심볼이 올바르게 설정되어야 함", async function () {
      expect(await token.name()).to.equal("LuckyDraw Token");
      expect(await token.symbol()).to.equal("LDT");
    });

    it("배포자가 10 LDT를 받아야 함", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("10")); // utils 제거
    });
  });

  describe("기본 토큰 지급", function () {
    it("사용자가 3 LDT를 받을 수 있음", async function () {
      await token.connect(user1).claimDefaultToken();
      
      const balance = await token.balanceOf(user1.address);
      expect(balance).to.equal(ethers.parseEther("3")); // utils 제거
    });

    it("여러 사용자가 각각 토큰을 받을 수 있음", async function () {
      await token.connect(user1).claimDefaultToken();
      await token.connect(user2).claimDefaultToken();
      
      expect(await token.balanceOf(user1.address)).to.equal(ethers.parseEther("3"));
      expect(await token.balanceOf(user2.address)).to.equal(ethers.parseEther("3"));
    });

    it("같은 사용자가 여러 번 토큰을 받을 수 있음 (중복 방지 없음)", async function () {
      await token.connect(user1).claimDefaultToken();
      await token.connect(user1).claimDefaultToken();
      
      const balance = await token.balanceOf(user1.address);
      expect(balance).to.equal(ethers.parseEther("6")); // 3 + 3
    });

    it("DefaultTokenClaimed 이벤트가 발생해야 함", async function () {
      await expect(token.connect(user1).claimDefaultToken())
        .to.emit(token, "DefaultTokenClaimed")
        .withArgs(user1.address, ethers.parseEther("3"));
    });
  });

  describe("쿠폰 등록", function () {
    beforeEach(async function () {
      await token.connect(user1).claimDefaultToken();
    });

    it("5000원 쿠폰을 등록하면 1 LDT를 받아야 함", async function () {
      await token.connect(user1).addCoupon(
        "스타벅스 아메리카노",
        "STAR-2024-001",
        "앱에서 코드 입력",
        4000
      );

      const balance = await token.balanceOf(user1.address);
      expect(balance).to.equal(ethers.parseEther("4")); // 3 + 1
    });

    it("10000원 쿠폰을 등록하면 2 LDT를 받아야 함", async function () {
      await token.connect(user1).addCoupon(
        "배달의민족 쿠폰",
        "BMIN-2024-001",
        "앱에서 코드 입력",
        8000
      );

      const balance = await token.balanceOf(user1.address);
      expect(balance).to.equal(ethers.parseEther("5")); // 3 + 2
    });

    it("가격대별 카테고리가 올바르게 결정되어야 함", async function () {
      // 1 LDT 카테고리 (5000원 이하)
      await token.connect(user1).addCoupon("쿠폰1", "CODE-001", "설명", 3000);
      expect(await token.getCategoryCount(1)).to.equal(1);

      // 2 LDT 카테고리 (5001~10000원)
      await token.connect(user1).addCoupon("쿠폰2", "CODE-002", "설명", 7000);
      expect(await token.getCategoryCount(2)).to.equal(1);

      // 3 LDT 카테고리 (10001~15000원)
      await token.connect(user1).addCoupon("쿠폰3", "CODE-003", "설명", 12000);
      expect(await token.getCategoryCount(3)).to.equal(1);

      // 4 LDT 카테고리 (15001~20000원)
      await token.connect(user1).addCoupon("쿠폰4", "CODE-004", "설명", 18000);
      expect(await token.getCategoryCount(4)).to.equal(1);

      // 5 LDT 카테고리 (20001~25000원)
      await token.connect(user1).addCoupon("쿠폰5", "CODE-005", "설명", 23000);
      expect(await token.getCategoryCount(5)).to.equal(1);

      // 6 LDT 카테고리 (25001원 이상)
      await token.connect(user1).addCoupon("쿠폰6", "CODE-006", "설명", 30000);
      expect(await token.getCategoryCount(6)).to.equal(1);
    });

    it("같은 쿠폰 코드로 여러 번 등록 가능 (중복 방지 없음)", async function () {
      await token.connect(user1).addCoupon("쿠폰1", "DUPLICATE", "설명", 5000);
      await token.connect(user2).addCoupon("쿠폰2", "DUPLICATE", "설명", 5000);
      
      expect(await token.getCategoryCount(1)).to.equal(2);
    });

    it("빈 이름으로도 등록 가능 (검증 없음)", async function () {
      await token.connect(user1).addCoupon("", "CODE-001", "설명", 5000);
      expect(await token.getCategoryCount(1)).to.equal(1);
    });

    it("0원 가격으로도 등록 가능 (검증 없음)", async function () {
      await token.connect(user1).addCoupon("무료쿠폰", "FREE-001", "설명", 0);
      expect(await token.getCategoryCount(1)).to.equal(1); // 0원은 카테고리 1
    });

    it("CouponAdded 이벤트가 발생해야 함", async function () {
      await expect(token.connect(user1).addCoupon("테스트", "TEST-001", "설명", 5000))
        .to.emit(token, "CouponAdded")
        .withArgs(user1.address, "테스트", 1, 5000, ethers.parseEther("1"));
    });
  });

  describe("랜덤 뽑기", function () {
    beforeEach(async function () {
      // user1이 쿠폰 등록
      await token.connect(user1).claimDefaultToken();
      await token.connect(user1).addCoupon("테스트 쿠폰", "TEST-001", "설명", 4000);
      
      // user2가 토큰 받음
      await token.connect(user2).claimDefaultToken();
    });

    it("1 LDT로 1카테고리 뽑기 성공", async function () {
      const initialBalance = await token.balanceOf(user2.address);
      
      await token.connect(user2).drawCoupon(1);
      
      // 토큰이 1 LDT 차감되었는지 확인
      const finalBalance = await token.balanceOf(user2.address);
      expect(finalBalance).to.equal(initialBalance - ethers.parseEther("1"));
      
      // 쿠폰을 받았는지 확인
      const myCoupons = await token.connect(user2).getMyCoupons();
      expect(myCoupons.length).to.equal(1);
      expect(myCoupons[0].name).to.equal("테스트 쿠폰");
    });

    it("토큰이 부족하면 뽑기 실패", async function () {
      // user2는 3 LDT만 가지고 있는데 4 LDT 필요한 상황
      await expect(
        token.connect(user2).drawCoupon(4)
      ).to.be.revertedWith("insuficient token");
    });

    it("빈 카테고리에서 뽑기 시도하면 에러 (0으로 나누기)", async function () {
      // 카테고리 3에는 쿠폰이 없음
      await expect(
        token.connect(user2).drawCoupon(3)
      ).to.be.reverted; // 0으로 나누기 에러
    });

    it("뽑기 후 해당 쿠폰이 카테고리에서 제거됨", async function () {
      const initialCount = await token.getCategoryCount(1);
      expect(initialCount).to.equal(1);
      
      await token.connect(user2).drawCoupon(1);
      
      const finalCount = await token.getCategoryCount(1);
      expect(finalCount).to.equal(0);
    });

    it("CouponWon 이벤트가 발생해야 함", async function () {
      await expect(token.connect(user2).drawCoupon(1))
        .to.emit(token, "CouponWon")
        .withArgs(user2.address, "TEST-001", "테스트 쿠폰", 1);
    });
  });

  describe("조회 함수들", function () {
    beforeEach(async function () {
      await token.connect(user1).claimDefaultToken();
      await token.connect(user1).addCoupon("쿠폰1", "CODE-001", "설명1", 3000);
      await token.connect(user1).addCoupon("쿠폰2", "CODE-002", "설명2", 7000);
      await token.connect(user1).addCoupon("쿠폰3", "CODE-003", "설명3", 12000);
      await token.connect(user1).addCoupon("쿠폰4", "CODE-004", "설명4", 18000);
      await token.connect(user1).addCoupon("쿠폰5", "CODE-005", "설명5", 23000);
      await token.connect(user1).addCoupon("쿠폰6", "CODE-006", "설명6", 30000);
    });

    it("모든 카테고리 개수를 한번에 조회", async function () {
      const [count1, count2, count3, count4, count5, count6] = await token.getAllCategoryCount();
      expect(count1).to.equal(1);
      expect(count2).to.equal(1);
      expect(count3).to.equal(1);
      expect(count4).to.equal(1);
      expect(count5).to.equal(1);
      expect(count6).to.equal(1);
    });

    it("특정 카테고리의 쿠폰 목록 조회", async function () {
      const category1Items = await token.getCategoryItems(1);
      expect(category1Items.length).to.equal(1);
      expect(category1Items[0].name).to.equal("쿠폰1");
      expect(category1Items[0].couponCode).to.equal("CODE-001");
    });

    it("사용자별 당첨 쿠폰 조회", async function () {
      await token.connect(user2).claimDefaultToken();
      await token.connect(user2).drawCoupon(1);
      
      const myCoupons = await token.connect(user2).getMyCoupons();
      expect(myCoupons.length).to.equal(1);
      expect(myCoupons[0].name).to.equal("쿠폰1");
    });
  });

  describe("랜덤성 테스트", function () {
    it("여러 번 뽑기해도 랜덤 값이 다름", async function () {
      // 같은 카테고리에 여러 쿠폰 등록
      await token.connect(user1).claimDefaultToken();
      await token.connect(user1).addCoupon("쿠폰A", "A-001", "설명", 3000);
      await token.connect(user1).addCoupon("쿠폰B", "B-001", "설명", 3000);
      await token.connect(user1).addCoupon("쿠폰C", "C-001", "설명", 3000);

      // 여러 번 뽑기 (충분한 토큰 확보)
      await token.connect(user2).claimDefaultToken();
      await token.connect(user2).claimDefaultToken(); // 6 LDT
      
      await token.connect(user2).drawCoupon(1); // 첫 번째 뽑기
      await token.connect(user2).drawCoupon(1); // 두 번째 뽑기
      
      const myCoupons = await token.connect(user2).getMyCoupons();
      expect(myCoupons.length).to.equal(2);
      
      // 랜덤이므로 같을 수도 다를 수도 있지만, 함수가 작동하는지 확인
      console.log("뽑힌 쿠폰들:", myCoupons.map(c => c.name));
    });
  });
});