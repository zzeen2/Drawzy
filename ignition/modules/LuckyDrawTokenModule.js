// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LuckyDrawTokenModule", (m) => {
  // LuckyDrawToken 컨트랙트 배포
  // 생성자에 매개변수가 없으므로 빈 배열 전달
  const luckyDrawToken = m.contract("LuckyDrawToken", []);

  return { luckyDrawToken };
});