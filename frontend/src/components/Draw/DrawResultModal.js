import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 20px;
  padding: 40px;
  border: 2px solid #00d4ff;
  backdrop-filter: blur(20px);
  text-align: center;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00d4ff, #ff00ff, #00ff88, #00d4ff);
    border-radius: 20px;
    z-index: -1;
    animation: ${sparkle} 2s ease-in-out infinite;
  }
`;

const CongratulationsTitle = styled.h2`
  font-size: 2.5rem;
  color: #00d4ff;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
`;

const CouponCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  border: 1px solid rgba(0, 212, 255, 0.3);
`;

const CouponName = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CouponDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
  line-height: 1.5;
`;

const CouponCode = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: #00d4ff;
  letter-spacing: 2px;
`;

const CouponValue = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.4);
  }
`;

const DrawResultModal = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CongratulationsTitle>🎉 축하합니다! 🎉</CongratulationsTitle>
        
        <CouponCard>
          <CouponName>{result.name}</CouponName>
          <CouponDescription>{result.description}</CouponDescription>
          <CouponValue>{result.realPrice.toLocaleString()}원 상품권</CouponValue>
          <CouponCode>쿠폰 코드: {result.couponCode}</CouponCode>
        </CouponCard>
        
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
          상품권이 내 상품권 페이지에 추가되었습니다!
        </p>
        
        <CloseButton onClick={onClose}>
          확인
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DrawResultModal; 