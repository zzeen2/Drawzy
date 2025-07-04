import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Sidebar from './Sidebar';

// 별빛 애니메이션
const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

// 입자 떠다니는 애니메이션
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(5px) rotate(240deg); }
`;

// 그라디언트 애니메이션
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(-45deg, #0a0a0a, #1a1a2e, #16213e, #0f0f23);
  background-size: 400% 400%;
  ${css`animation: ${gradientShift} 15s ease infinite;`}
  position: relative;
  overflow: hidden;
`;

// 배경 별빛 효과
const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #fff, transparent),
      radial-gradient(2px 2px at 40px 70px, #00d4ff, transparent),
      radial-gradient(1px 1px at 90px 40px, #ff00ff, transparent),
      radial-gradient(1px 1px at 130px 80px, #fff, transparent),
      radial-gradient(2px 2px at 160px 30px, #00ff88, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    ${css`animation: ${twinkle} 3s ease-in-out infinite;`}
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 50px 50px, #fff, transparent),
      radial-gradient(1px 1px at 100px 100px, #00d4ff, transparent),
      radial-gradient(1px 1px at 150px 150px, #ff00ff, transparent);
    background-repeat: repeat;
    background-size: 250px 150px;
    ${css`animation: ${twinkle} 4s ease-in-out infinite reverse;`}
  }
`;

// 떠다니는 입자들
const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, #00d4ff, #ff00ff);
    border-radius: 50%;
    ${css`animation: ${float} 6s ease-in-out infinite;`}
    
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 60%;
      left: 20%;
      animation-delay: 2s;
    }
    
    &:nth-child(3) {
      top: 30%;
      left: 80%;
      animation-delay: 4s;
    }
    
    &:nth-child(4) {
      top: 80%;
      left: 70%;
      animation-delay: 1s;
    }
    
    &:nth-child(5) {
      top: 50%;
      left: 50%;
      animation-delay: 3s;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 240px;
  padding: 20px;
  position: relative;
  z-index: 3;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <StarField />
      <FloatingParticles>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </FloatingParticles>
      
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout; 