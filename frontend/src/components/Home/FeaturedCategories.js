import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

// 네온 펄스 애니메이션
const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }
  50% { 
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.3);
  }
`;

const CategoriesContainer = styled.section`
  padding: 80px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 40px 30px;
  border: 2px solid ${props => props.borderColor};
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.glowColor}, transparent);
    transition: left 0.5s;
    opacity: 0.1;
  }
  
  &:hover {
    transform: translateY(-10px);
    ${css`animation: ${neonPulse} 1.5s ease-in-out infinite;`}
    border-color: ${props => props.hoverColor};
    
    &::before {
      left: 100%;
    }
  }
`;

const CategoryIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px ${props => props.glowColor});
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.titleColor};
  margin-bottom: 15px;
`;

const CategoryDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.5;
`;

const CategoryPrice = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.priceColor};
  margin-bottom: 25px;
`;

const DrawButton = styled.button`
  background: linear-gradient(135deg, ${props => props.gradient});
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.shadowColor};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FeaturedCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 1,
      icon: '💙',
      title: '1 LDT 뽑기',
      description: '저렴한 가격대의 다양한 상품들을 만나보세요',
      priceRange: '1~5,000원',
      borderColor: '#00d4ff',
      titleColor: '#00d4ff',
      priceColor: '#00d4ff',
      glowColor: 'rgba(0, 212, 255, 0.3)',
      hoverColor: '#00d4ff',
      gradient: '#00d4ff, #0099cc',
      shadowColor: 'rgba(0, 212, 255, 0.4)',
    },
    {
      id: 2,
      icon: '💜',
      title: '2 LDT 뽑기',
      description: '중간 가격대의 인기 상품들을 획득하세요',
      priceRange: '5,001~10,000원',
      borderColor: '#8B5CF6',
      titleColor: '#8B5CF6',
      priceColor: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      hoverColor: '#8B5CF6',
      gradient: '#8B5CF6, #7C3AED',
      shadowColor: 'rgba(139, 92, 246, 0.4)',
    },
    {
      id: 3,
      icon: '💖',
      title: '3 LDT 뽑기',
      description: '프리미엄 상품들의 특별한 경험을 누려보세요',
      priceRange: '10,001~15,000원',
      borderColor: '#ff00ff',
      titleColor: '#ff00ff',
      priceColor: '#ff00ff',
      glowColor: 'rgba(255, 0, 255, 0.3)',
      hoverColor: '#ff00ff',
      gradient: '#ff00ff, #cc00cc',
      shadowColor: 'rgba(255, 0, 255, 0.4)',
    },
    {
      id: 4,
      icon: '💚',
      title: '4 LDT 뽑기',
      description: '고급 상품들의 프리미엄 컬렉션',
      priceRange: '15,001~20,000원',
      borderColor: '#00ff88',
      titleColor: '#00ff88',
      priceColor: '#00ff88',
      glowColor: 'rgba(0, 255, 136, 0.3)',
      hoverColor: '#00ff88',
      gradient: '#00ff88, #00cc66',
      shadowColor: 'rgba(0, 255, 136, 0.4)',
    },
    {
      id: 5,
      icon: '🧡',
      title: '5 LDT 뽑기',
      description: '최고급 상품들의 럭셔리 컬렉션',
      priceRange: '20,001~25,000원',
      borderColor: '#ff6600',
      titleColor: '#ff6600',
      priceColor: '#ff6600',
      glowColor: 'rgba(255, 102, 0, 0.3)',
      hoverColor: '#ff6600',
      gradient: '#ff6600, #ff4400',
      shadowColor: 'rgba(255, 102, 0, 0.4)',
    },
    {
      id: 6,
      icon: '❤️',
      title: '6 LDT 뽑기',
      description: '최상급 상품들의 얼티밋 컬렉션',
      priceRange: '25,001원 이상',
      borderColor: '#ff1744',
      titleColor: '#ff1744',
      priceColor: '#ff1744',
      glowColor: 'rgba(255, 23, 68, 0.3)',
      hoverColor: '#ff1744',
      gradient: '#ff1744, #d50000',
      shadowColor: 'rgba(255, 23, 68, 0.4)',
    },
  ];

  const handleDraw = (categoryId) => {
    navigate('/draw');
  };

  return (
    <CategoriesContainer>
      <SectionTitle>🎲 카테고리별 뽑기</SectionTitle>
      <SectionSubtitle>
        원하는 가격대의 카테고리를 선택하고 특별한 상품을 획득하세요!
      </SectionSubtitle>
      
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            borderColor={category.borderColor}
            glowColor={category.glowColor}
            hoverColor={category.hoverColor}
          >
            <CategoryIcon glowColor={category.glowColor}>
              {category.icon}
            </CategoryIcon>
            <CategoryTitle titleColor={category.titleColor}>
              {category.title}
            </CategoryTitle>
            <CategoryDescription>
              {category.description}
            </CategoryDescription>
            <CategoryPrice priceColor={category.priceColor}>
              💰 {category.priceRange}
            </CategoryPrice>
            <DrawButton
              gradient={category.gradient}
              shadowColor={category.shadowColor}
              onClick={() => handleDraw(category.id)}
            >
              🎯 뽑기 시작
            </DrawButton>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  );
};

export default FeaturedCategories; 