import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useWallet } from '../../hooks';

// 캐릭터 바운스 애니메이션
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

// 텍스트 글로우 애니메이션
const glow = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
  50% { text-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.5); }
`;

// 회전 애니메이션
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 펄스 애니메이션
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 40px;
  position: relative;
  gap: 40px;
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    text-align: center;
    padding: 30px 20px;
    gap: 32px;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const TitleSection = styled.div`
  margin-bottom: 0;
`;

const MainTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #ff00ff, #00ff88);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  ${css`animation: ${glow} 3s ease-in-out infinite;`}
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CycleSection = styled.div`
  margin: 0 0 24px 0;
`;

const CycleTitle = styled.h2`
  font-size: 2.5rem;
  color: #00d4ff;
  margin-bottom: 40px;
  ${css`animation: ${glow} 3s ease-in-out infinite;`}
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CycleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 520px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 300px;
  }
`;

const CycleStep = styled.div`
  background: linear-gradient(135deg, ${props => props.bgColor}, ${props => props.bgColor}80);
  border-radius: 20px;
  border: 2px solid ${props => props.borderColor};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  ${css`animation: ${pulse} 3s ease-in-out infinite;`}
  animation-delay: ${props => props.delay};
  backdrop-filter: blur(10px);
  min-width: 0;
  min-height: 140px;
  position: relative;
  
  &:hover {
    transform: translateY(-8px) scale(1.05);
    ${css`animation: ${glow} 1s ease-in-out infinite;`}
    box-shadow: 0 15px 40px ${props => props.borderColor}40;
  }
  
  .step-icon {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }
  
  .step-number {
    font-size: 0.9rem;
    color: ${props => props.borderColor};
    margin-bottom: 4px;
    font-weight: bold;
  }
  
  .step-text {
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 4px;
  }
  
  .step-desc {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    line-height: 1.2;
  }
  
  @media (max-width: 1024px) {
    padding: 18px 8px;
    min-height: 120px;
    
    .step-icon {
      font-size: 1.7rem;
    }
    
    .step-text {
      font-size: 0.95rem;
    }
    
    .step-desc {
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 12px 4px;
    min-height: 100px;
    
    .step-icon {
      font-size: 1.2rem;
      margin-bottom: 4px;
    }
    
    .step-text {
      font-size: 0.8rem;
    }
    
    .step-desc {
      font-size: 0.7rem;
    }
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const GiftCircleWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto 36px auto;
`;

const GiftCircle = styled.div`
  width: 260px;
  height: 260px;
  background: radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, rgba(255,0,255,0.10) 100%);
  border-radius: 50%;
  border: 2.5px solid #00d4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 40px 0 rgba(0,212,255,0.15);
`;

const FloatingEmoji = styled.div`
  position: absolute;
  font-size: 2.2rem;
  pointer-events: none;
  opacity: 0.85;
  animation: floatEmoji 6s ease-in-out infinite;
  z-index: 1;
  @keyframes floatEmoji {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-18px) scale(1.1); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0.7; }
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const wallet = useWallet();
  const { account, connectWallet } = wallet;
  
  const handleStartClick = async () => {
    if (account) {
      navigate('/draw');
    } else {
      try {
        await connectWallet();
      } catch (error) {
        console.error('지갑 연결 실패:', error);
      }
    }
  };
  
  return (
    <HeroContainer>
      <LeftColumn>
        <TitleSection>
          <MainTitle>Drawzy</MainTitle>
          <Subtitle>
            Web3 / 블록체인 기반 랜덤뽑기 마켓플레이스<br />
            LuckyDraw Token으로 특별한 상품을 획득하세요!
          </Subtitle>
        </TitleSection>
        <CTAButton onClick={handleStartClick}>
          {account ? '🎲 뽑기 시작하기' : '🚀 지갑 연결하고 시작하기'}
        </CTAButton>
      </LeftColumn>
      <RightColumn>
        <GiftCircleWrapper>
          <GiftCircle>🎁</GiftCircle>
          <FloatingEmoji style={{ top: '2%', left: '-5%', animationDelay: '0s' }}>🎲</FloatingEmoji>
          <FloatingEmoji style={{ top: '12%', right: '-5%', animationDelay: '1s' }}>💎</FloatingEmoji>
          <FloatingEmoji style={{ bottom: '5%', left: '-2%', animationDelay: '2s' }}>⭐</FloatingEmoji>
          <FloatingEmoji style={{ bottom: '2%', right: '-2%', animationDelay: '2.5s' }}>🎯</FloatingEmoji>
          <FloatingEmoji style={{ top: '65%', left: '105%', animationDelay: '3s' }}>🎉</FloatingEmoji>
        </GiftCircleWrapper>
        <CycleSection>
          <CycleContainer>
            <CycleStep
              bgColor="rgba(0, 212, 255, 0.2)"
              borderColor="#00d4ff"
              delay="0s"
              onClick={() => navigate('/draw')}
            >
              <div className="step-number">STEP 1</div>
              <div className="step-icon">💰</div>
              <div className="step-text">토큰 받기</div>
              <div className="step-desc">가입 시 3 LDT 무료 지급</div>
            </CycleStep>
            <CycleStep
              bgColor="rgba(139, 92, 246, 0.2)"
              borderColor="#8B5CF6"
              delay="0.5s"
              onClick={() => navigate('/draw')}
            >
              <div className="step-number">STEP 2</div>
              <div className="step-icon">🎲</div>
              <div className="step-text">상품권 뽑기</div>
              <div className="step-desc">1-6 LDT로 뽑기 참여</div>
            </CycleStep>
            <CycleStep
              bgColor="rgba(255, 0, 255, 0.2)"
              borderColor="#ff00ff"
              delay="1s"
              onClick={() => navigate('/my-items')}
            >
              <div className="step-number">STEP 3</div>
              <div className="step-icon">🎁</div>
              <div className="step-text">상품권 획득</div>
              <div className="step-desc">랜덤으로 상품권 당첨</div>
            </CycleStep>
            <CycleStep
              bgColor="rgba(0, 255, 136, 0.2)"
              borderColor="#00ff88"
              delay="1.5s"
              onClick={() => navigate('/admin')}
            >
              <div className="step-number">STEP 4</div>
              <div className="step-icon">📤</div>
              <div className="step-text">내 상품 등록</div>
              <div className="step-desc">새로운 상품권 등록하기</div>
            </CycleStep>
          </CycleContainer>
        </CycleSection>
      </RightColumn>
    </HeroContainer>
  );
};

export default HeroSection; 