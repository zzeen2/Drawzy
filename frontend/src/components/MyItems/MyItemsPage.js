import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useWallet, useCoupon } from '../../hooks';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
`;

const MyItemsContainer = styled.div`
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
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
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #00d4ff, #ff00ff)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #00d4ff, #ff00ff)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const ItemsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 40px;
  justify-content: center;
`;

const ItemCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  position: relative;
  overflow: hidden;
  width: 350px;
  flex-shrink: 0;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    ${css`animation: ${shimmer} 2s infinite;`}
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ItemName = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  color: #00d4ff;
  margin-bottom: 5px;
  flex: 1;
`;

const CategoryBadge = styled.span`
  background: ${props => props.bgColor};
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
`;

const ItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
  line-height: 1.5;
`;

const ItemValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 15px;
`;

const CouponCode = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  font-weight: bold;
  color: #00d4ff;
  letter-spacing: 1px;
  text-align: center;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CopyButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
  }
`;

const DrawDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
  
  .icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  .message {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .submessage {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 212, 255, 0.3);
    border-top: 3px solid #00d4ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MyItemsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const wallet = useWallet();
  const { myCoupons, getMyCoupons } = useCoupon(wallet);
  const { account } = wallet;

  useEffect(() => {
    if (account) {
      loadMyCoupons();
    }
  }, [account]);

  const loadMyCoupons = async () => {
    setLoading(true);
    try {
      await getMyCoupons();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category) => {
    const categories = {
      1: { name: '1 HBT', color: '#00d4ff' },
      2: { name: '2 HBT', color: '#8B5CF6' },
      3: { name: '3 HBT', color: '#ff00ff' },
      4: { name: '4 HBT', color: '#00ff88' },
      5: { name: '5 HBT', color: '#ff6600' },
      6: { name: '6 HBT', color: '#ff1744' }
    };
    return categories[category] || { name: `${category} HBT`, color: '#00d4ff' };
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('쿠폰 코드가 복사되었습니다!');
  };

  const filteredCoupons = myCoupons.filter(coupon => {
    if (categoryFilter === 'all') return true;
    return coupon.category.toString() === categoryFilter;
  });

  if (!account) {
    return (
      <MyItemsContainer>
        <PageTitle>🎁 내 상품권</PageTitle>
        <PageSubtitle>
          지갑을 연결하여 상품권을 확인하세요!
        </PageSubtitle>
      </MyItemsContainer>
    );
  }

  return (
    <MyItemsContainer>
      <PageTitle>🎁 내 상품권</PageTitle>
      <PageSubtitle>
        뽑기로 획득한 모든 상품권을 확인하고 관리하세요!<br/>
        쿠폰 코드를 복사하여 사용할 수 있습니다.
      </PageSubtitle>



      <FilterSection>
        <FilterButton active={categoryFilter==='all'} onClick={()=>setCategoryFilter('all')}>전체</FilterButton>
        <FilterButton active={categoryFilter==='1'} onClick={()=>setCategoryFilter('1')}>1 LDT</FilterButton>
        <FilterButton active={categoryFilter==='2'} onClick={()=>setCategoryFilter('2')}>2 LDT</FilterButton>
        <FilterButton active={categoryFilter==='3'} onClick={()=>setCategoryFilter('3')}>3 LDT</FilterButton>
        <FilterButton active={categoryFilter==='4'} onClick={()=>setCategoryFilter('4')}>4 LDT</FilterButton>
        <FilterButton active={categoryFilter==='5'} onClick={()=>setCategoryFilter('5')}>5 LDT</FilterButton>
        <FilterButton active={categoryFilter==='6'} onClick={()=>setCategoryFilter('6')}>6 LDT</FilterButton>
      </FilterSection>

      <ItemsGrid>
        {filteredCoupons.map((coupon, idx) => (
          <ItemCard
            key={coupon.id || idx}
            style={{
              opacity: coupon.used ? 0.5 : 1,
              filter: coupon.used ? 'grayscale(0.5)' : 'none',
              position: 'relative',
              border: coupon.used ? '2px solid #888' : '1px solid rgba(0, 212, 255, 0.3)'
            }}
          >
            <ItemHeader>
              <ItemName>{coupon.name}</ItemName>
              <CategoryBadge bgColor={getCategoryInfo(coupon.category).color}>
                {getCategoryInfo(coupon.category).name.replace('HBT', 'LDT')}
              </CategoryBadge>
            </ItemHeader>
            <ItemDescription>{coupon.description}</ItemDescription>
            <ItemValue>{coupon.realPrice?.toLocaleString()} LDT</ItemValue>
            <CouponCode>{coupon.code}</CouponCode>
            <ItemFooter>
              <CopyButton onClick={() => handleCopyCode(coupon.code)}>
                코드 복사
              </CopyButton>
              <button
                onClick={() => {
                  coupon.used = !coupon.used;
                  setLoading(l => !l);
                }}
                style={{
                  background: coupon.used ? '#888' : '#00d4ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '8px 18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  marginLeft: '10px',
                  boxShadow: coupon.used ? '0 0 10px #88888880' : '0 0 10px #00d4ff80',
                  opacity: 0.95
                }}
              >
                {coupon.used ? '사용됨' : '사용완료'}
              </button>
            </ItemFooter>
          </ItemCard>
        ))}
      </ItemsGrid>

      {loading && (
        <LoadingSpinner>
          <div className="spinner" />
        </LoadingSpinner>
      )}
      {!loading && filteredCoupons.length === 0 && (
        <EmptyState>
          <div className="icon">📭</div>
          <div className="message">보유한 상품권이 없습니다</div>
        </EmptyState>
      )}
    </MyItemsContainer>
  );
};

export default MyItemsPage; 