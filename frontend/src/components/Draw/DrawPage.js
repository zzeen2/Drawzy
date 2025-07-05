import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useWallet, useToken, useLuckyDraw } from '../../hooks';
import DrawResultModal from './DrawResultModal';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }
  50% { 
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.4);
  }
`;

const DrawContainer = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00d4ff, #ff00ff, #00ff88);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 50px;
  max-width: 600px;
`;

const CategorySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 800px;
`;

const CategoryButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props => props.borderColor};
  border-radius: 15px;
  padding: 20px;
  color: ${props => props.textColor};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.borderColor}20, ${props => props.borderColor}10);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: ${props => props.hoverBg};
    ${css`animation: ${glow} 2s ease-in-out infinite;`}
    box-shadow: 0 15px 40px ${props => props.borderColor}40;
    
    &::before {
      opacity: 1;
    }
  }
  
  &.active {
    background: ${props => props.activeBg};
    transform: translateY(-5px);
    border-width: 3px;
    box-shadow: 0 0 20px ${props => props.borderColor}60;
    
    &::before {
      opacity: 1;
    }
    
    .title {
      font-size: 1.2rem;
    }
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
    
         &:hover {
       transform: none;
       ${css`animation: none;`}
       box-shadow: none;
     }
  }
  
  .icon {
    font-size: 2rem;
    margin-bottom: 10px;
    display: block;
    transition: all 0.3s ease;
  }
  
  .title {
    font-size: 1.1rem;
    margin-bottom: 5px;
    transition: all 0.3s ease;
  }
  
  .price {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .count {
    font-size: 0.8rem;
    margin-top: 5px;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  &.active .count {
    opacity: 1;
    font-weight: bold;
  }
`;

const DrawSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const DrawMachine = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 255, 0.1));
  border: 3px solid rgba(0, 212, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  backdrop-filter: blur(20px);
  
  &.spinning {
    ${css`animation: ${spin} 2s linear infinite;`}
  }
  
  &.pulsing {
    ${css`animation: ${pulse} 1s ease-in-out infinite;`}
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const DrawIcon = styled.div`
  font-size: 6rem;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const DrawButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  border: none;
  padding: 20px 50px;
  border-radius: 50px;
  color: white;
  font-size: 1.3rem;
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CheckMark = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.borderColor};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const DrawPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [drawResult, setDrawResult] = useState(null);
  
  const wallet = useWallet();
  const { balance, updateBalance } = useToken(wallet);
  const { drawCoupon, categoryCounts, getAllCategoryCounts, addDrawActivity } = useLuckyDraw(wallet);
  const { account, isNetwork, connectWallet } = wallet;



  const categories = [
    {
      id: 1,
      icon: '💙',
      title: '1 LDT',
      price: '1~5,000원',
      borderColor: '#00d4ff',
      textColor: '#00d4ff',
      hoverBg: 'rgba(0, 212, 255, 0.1)',
      activeBg: 'rgba(0, 212, 255, 0.2)',
    },
    {
      id: 2,
      icon: '💜',
      title: '2 LDT',
      price: '5,001~10,000원',
      borderColor: '#8B5CF6',
      textColor: '#8B5CF6',
      hoverBg: 'rgba(139, 92, 246, 0.1)',
      activeBg: 'rgba(139, 92, 246, 0.2)',
    },
    {
      id: 3,
      icon: '💖',
      title: '3 LDT',
      price: '10,001~15,000원',
      borderColor: '#ff00ff',
      textColor: '#ff00ff',
      hoverBg: 'rgba(255, 0, 255, 0.1)',
      activeBg: 'rgba(255, 0, 255, 0.2)',
    },
    {
      id: 4,
      icon: '💚',
      title: '4 LDT',
      price: '15,001~20,000원',
      borderColor: '#00ff88',
      textColor: '#00ff88',
      hoverBg: 'rgba(0, 255, 136, 0.1)',
      activeBg: 'rgba(0, 255, 136, 0.2)',
    },
    {
      id: 5,
      icon: '🧡',
      title: '5 LDT',
      price: '20,001~25,000원',
      borderColor: '#ff6600',
      textColor: '#ff6600',
      hoverBg: 'rgba(255, 102, 0, 0.1)',
      activeBg: 'rgba(255, 102, 0, 0.2)',
    },
    {
      id: 6,
      icon: '❤️',
      title: '6 LDT',
      price: '25,001원 이상',
      borderColor: '#ff1744',
      textColor: '#ff1744',
      hoverBg: 'rgba(255, 23, 68, 0.1)',
      activeBg: 'rgba(255, 23, 68, 0.2)',
    },
  ];

  useEffect(() => {
    if (account) {
      getAllCategoryCounts();
      updateBalance();
    }
  }, [account, getAllCategoryCounts, updateBalance]);

  const handleDraw = async () => {
    if (!account || !isNetwork) {
      alert('지갑을 연결하고 Sepolia 네트워크를 확인해주세요!');
      return;
    }

    if (parseFloat(balance) < selectedCategory) {
      alert(`잔액이 부족합니다! ${selectedCategory} LDT가 필요합니다.`);
      return;
    }

    setIsDrawing(true);
    
    try {
      if (typeof addDrawActivity === 'function') {
        addDrawActivity(selectedCategory, '상품권');
      }
      
      const result = await drawCoupon(selectedCategory);
      
      if (result) {
        setDrawResult(result);
        setShowResult(true);
      }
      setIsDrawing(false);
      updateBalance();
      getAllCategoryCounts();
      
    } catch (error) {
      alert('뽑기에 실패했습니다: ' + error.message);
      setIsDrawing(false);
    }
  };

  const canDraw = account && isNetwork && parseFloat(balance) >= selectedCategory && categoryCounts[selectedCategory - 1] > 0;

  if (!account) {
    return (
      <DrawContainer>
        <PageTitle>🎲 럭키 드로우</PageTitle>
        <PageSubtitle>
          뽑기를 시작하려면 먼저 지갑을 연결해주세요!
        </PageSubtitle>
        
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
          <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>지갑 연결 필요</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}>
            MetaMask 지갑을 연결하여 뽑기를 시작하세요!
          </p>
          <button
            onClick={connectWallet}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🔗 지갑 연결하기
          </button>
        </div>
      </DrawContainer>
    );
  }

  return (
    <DrawContainer>
      <PageTitle>🎲 Lucky Draw</PageTitle>
      <div style={{
        fontSize: '1.25rem',
        color: '#00d4ff',
        fontWeight: 600,
        marginBottom: '18px',
        textAlign: 'center',
        textShadow: '0 0 10px #00d4ff80'
      }}>
        보유 LDT: {balance || '로딩 중...'} LDT
      </div>
      <PageSubtitle>
        원하는 가격대의 상품권을 LDT 토큰과 교환하여 뽑아보세요!
      </PageSubtitle>

      <CategorySelector>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            borderColor={category.borderColor}
            textColor={category.textColor}
            hoverBg={category.hoverBg}
            activeBg={category.activeBg}
            onClick={() => setSelectedCategory(category.id)}
            disabled={categoryCounts[category.id - 1] === 0 && categoryCounts.some(count => count > 0)}
          >
            <span className="icon">{category.icon}</span>
            <div className="title">{category.title}</div>
            <div className="price">{category.price}</div>
            <div className="count">
              {categoryCounts[category.id - 1] || 0}개 상품
            </div>
            {selectedCategory === category.id && (
              <CheckMark borderColor={category.borderColor}>
                ✓
              </CheckMark>
            )}
          </CategoryButton>
        ))}
      </CategorySelector>

      <DrawSection>
        <DrawMachine 
          className={isDrawing ? 'spinning' : ''}
        >
          <DrawIcon>🎰</DrawIcon>
        </DrawMachine>
        
        <DrawButton
          onClick={handleDraw}
          disabled={!canDraw || isDrawing}
          style={{
            background: canDraw && !isDrawing 
              ? `linear-gradient(135deg, ${categories.find(c => c.id === selectedCategory)?.borderColor || '#00d4ff'}, #ff00ff)`
              : 'linear-gradient(135deg, #666, #999)',
            boxShadow: canDraw && !isDrawing 
              ? `0 15px 35px ${categories.find(c => c.id === selectedCategory)?.borderColor || '#00d4ff'}40`
              : 'none'
          }}
        >
          {isDrawing ? '🎲 뽑는 중...' : `🎯 ${categories.find(c => c.id === selectedCategory)?.title} 뽑기!`}
        </DrawButton>
      </DrawSection>

      {showResult && (
        <DrawResultModal
          result={drawResult}
          onClose={() => setShowResult(false)}
        />
      )}
    </DrawContainer>
  );
};

export default DrawPage; 