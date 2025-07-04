import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useCoupon, useWallet } from '../../hooks';

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }
  50% { 
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.3);
  }
`;

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }
  50% { 
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.3);
  }
`;

const success = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 40px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 60px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 50px auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props => props.borderColor};
  border-radius: 15px;
  padding: 20px;
  color: ${props => props.titleColor};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${props => props.glowColor}20, ${props => props.glowColor}10);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: ${props => props.hoverBg};
    ${css`animation: ${neonPulse} 2s ease-in-out infinite;`}
    box-shadow: 0 15px 40px ${props => props.glowColor}40;
    
    &::before {
      opacity: 1;
    }
    
    .icon {
      transform: scale(1.2);
      filter: drop-shadow(0 0 15px ${props => props.borderColor});
    }
    
    .title {
      text-shadow: 0 0 10px ${props => props.borderColor};
      font-size: 1.2rem;
    }
  }
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
  display: block;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px ${props => props.glowColor});
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.titleColor};
  margin-bottom: 5px;
  transition: all 0.3s ease;
`;

const CategoryDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.5;
`;

const CategoryPrice = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${props => props.priceColor};
  opacity: 0.8;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(20px);
  margin-bottom: 30px;
  width: 60%;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    ${css`animation: ${glow} 2s ease-in-out infinite;`}
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    ${css`animation: ${glow} 2s ease-in-out infinite;`}
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px 30px;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 2;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ff4444, #cc0000);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  ${css`animation: ${success} 0.6s ease-out;`}
`;

const SelectedCategoryInfo = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  width: 60%;
  margin: 0 auto 30px auto;
  
  .category-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00d4ff;
    margin-bottom: 10px;
    display: inline-block;
    margin-right: 15px;
  }
  
  .category-range {
    color: rgba(255, 255, 255, 0.8);
    display: inline-block;
  }
`;

const RegisterCouponPage = () => {
  const wallet = useWallet();
  const { account } = wallet;
  const { registerCoupon } = useCoupon(wallet);
  
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    value: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const categories = [
    {
      id: 1,
      icon: '💙',
      title: '1 LDT',
      priceRange: '1~5,000원',
      borderColor: '#00d4ff',
      titleColor: '#00d4ff',
      priceColor: '#00d4ff',
      glowColor: 'rgba(0, 212, 255, 0.3)',
      hoverColor: '#00d4ff',
    },
    {
      id: 2,
      icon: '💜',
      title: '2 LDT',
      priceRange: '5,001~10,000원',
      borderColor: '#8B5CF6',
      titleColor: '#8B5CF6',
      priceColor: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      hoverColor: '#8B5CF6',
    },
    {
      id: 3,
      icon: '💖',
      title: '3 LDT',
      priceRange: '10,001~15,000원',
      borderColor: '#ff00ff',
      titleColor: '#ff00ff',
      priceColor: '#ff00ff',
      glowColor: 'rgba(255, 0, 255, 0.3)',
      hoverColor: '#ff00ff',
    },
    {
      id: 4,
      icon: '💚',
      title: '4 LDT',
      priceRange: '15,001~20,000원',
      borderColor: '#00ff88',
      titleColor: '#00ff88',
      priceColor: '#00ff88',
      glowColor: 'rgba(0, 255, 136, 0.3)',
      hoverColor: '#00ff88',
    },
    {
      id: 5,
      icon: '🧡',
      title: '5 LDT',
      priceRange: '20,001~25,000원',
      borderColor: '#ff6600',
      titleColor: '#ff6600',
      priceColor: '#ff6600',
      glowColor: 'rgba(255, 102, 0, 0.3)',
      hoverColor: '#ff6600',
    },
    {
      id: 6,
      icon: '❤️',
      title: '6 LDT',
      priceRange: '25,001원 이상',
      borderColor: '#ff1744',
      titleColor: '#ff1744',
      priceColor: '#ff1744',
      glowColor: 'rgba(255, 23, 68, 0.3)',
      hoverColor: '#ff1744',
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setMessage('지갑을 먼저 연결해주세요.');
      setMessageType('error');
      return;
    }

    if (!formData.name || !formData.description || !formData.code || !formData.value) {
      setMessage('모든 필드를 입력해주세요.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await registerCoupon(
        formData.name,
        formData.description,
        selectedCategory.id,
        formData.code,
        formData.value
      );
      
      setFormData({
        name: '',
        description: '',
        code: '',
        value: ''
      });
      setStep(1);
      setSelectedCategory(null);
      
    } catch (error) {
      setMessage('쿠폰 등록에 실패했습니다. 다시 시도해주세요.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setSelectedCategory(null);
    setMessage('');
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <PageTitle>🎫 상품권 등록</PageTitle>
        
        {step === 1 && (
          <>
            <PageSubtitle>등록할 상품권의 가격대를 선택해주세요</PageSubtitle>
            <CategoriesGrid>
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  borderColor={category.borderColor}
                  glowColor={category.glowColor}
                  hoverColor={category.hoverColor}
                  hoverBg={`rgba(${category.borderColor === '#00d4ff' ? '0, 212, 255' : 
                    category.borderColor === '#8B5CF6' ? '139, 92, 246' :
                    category.borderColor === '#ff00ff' ? '255, 0, 255' :
                    category.borderColor === '#00ff88' ? '0, 255, 136' :
                    category.borderColor === '#ff6600' ? '255, 102, 0' :
                    '255, 23, 68'}, 0.1)`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <CategoryIcon className="icon" glowColor={category.glowColor}>
                    {category.icon}
                  </CategoryIcon>
                  <CategoryTitle className="title" titleColor={category.titleColor}>
                    {category.title}
                  </CategoryTitle>
                  <CategoryPrice className="price" priceColor={category.priceColor}>
                    {category.priceRange}
                  </CategoryPrice>
                </CategoryCard>
              ))}
            </CategoriesGrid>
          </>
        )}

        {step === 2 && (
          <>
            <PageSubtitle>선택한 카테고리의 상품권 정보를 입력해주세요</PageSubtitle>
            
            {selectedCategory && (
              <SelectedCategoryInfo>
                <div className="category-name">{selectedCategory.title} 상품권</div>
                <div className="category-range">{selectedCategory.priceRange}</div>
              </SelectedCategoryInfo>
            )}

            {message && messageType === 'error' && (
              <ErrorMessage>{message}</ErrorMessage>
            )}
            
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>상품권명</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="예: 스타벅스 아메리카노"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>상품권 설명</Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="상품권에 대한 자세한 설명을 입력하세요"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>쿠폰 코드</Label>
                  <Input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="쿠폰 코드를 입력하세요 (예: STARBUCKS2024)"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>상품권 가치 (원)</Label>
                  <Input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder={`예: ${selectedCategory?.priceRange?.includes('~') ? selectedCategory.priceRange.split('~')[0].trim().replace(',', '').replace('원', '') : '5000'}`}
                    min="0"
                    required
                  />
                </FormGroup>

                                 <ButtonGroup>
                   <BackButton type="button" onClick={handleBack}>
                     ← 뒤로
                   </BackButton>
                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? '등록 중...' : '상품권 등록하기'}
                  </SubmitButton>
                </ButtonGroup>
              </form>
            </FormContainer>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default RegisterCouponPage; 