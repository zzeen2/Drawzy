import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useWallet, useLuckyDraw, useCoupon } from '../../hooks';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StatsContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
  color: white;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00d4ff, #ff00ff, #00ff88);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 40px;
  text-align: center;
  background-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${props => props.borderColor || 'rgba(0, 212, 255, 0.3)'};
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  ${css`animation: ${slideIn} 0.6s ease-out;`}
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    transform: translateY(-5px);
    ${css`animation: ${pulse} 2s ease-in-out infinite;`}
    border-color: ${props => props.borderColor || '#00d4ff'};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .icon {
    font-size: 2.5rem;
    margin-right: 15px;
  }
  
  .title {
    font-size: 1.3rem;
    font-weight: bold;
    color: ${props => props.titleColor || '#00d4ff'};
  }
`;

const CardContent = styled.div`
  .value {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${props => props.valueColor || '#ffffff'};
    margin-bottom: 10px;
  }
  
  .description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const CategoryChart = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const CategoryItem = styled.div`
  background: rgba(${props => props.bgColor}, 0.1);
  border: 1px solid rgba(${props => props.bgColor}, 0.3);
  border-radius: 12px;
  padding: 15px 10px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(${props => props.bgColor}, 0.2);
    transform: scale(1.05);
  }
  
  .category-icon {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  .category-name {
    font-size: 0.9rem;
    font-weight: bold;
    color: rgb(${props => props.bgColor});
    margin-bottom: 8px;
  }
  
  .category-count {
    line-height: 1.3;
  }
`;

const RecentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 212, 255, 0.5);
    border-radius: 3px;
  }
`;

const RecentItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 3px solid ${props => props.categoryColor};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  .coupon-name {
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
  }
  
  .coupon-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .coupon-category {
    color: ${props => props.categoryColor};
    font-weight: bold;
  }
`;

const ActivityFeed = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 20px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 0, 255, 0.5);
    border-radius: 3px;
  }
`;

const ActivityItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  border-left: 3px solid #ff00ff;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  
  .activity-time {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }
`;

const StatsPage = () => {
  const wallet = useWallet();
  const { 
    categoryCounts, 
    getAllCategoryCounts, 
    getAllPlatformCoupons,
    getRemainingCouponsStats,
    getRecentEvents,
    addDrawActivity,
    allCoupons,
    totalCouponsCount,
    totalCouponsValue,
    remainingCouponsCount,
    remainingCouponsValue,
    recentEvents
  } = useLuckyDraw(wallet);
  
  const [loading, setLoading] = useState(true);
  const [recentCoupons, setRecentCoupons] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const categories = [
    { id: 1, name: '1 LDT', icon: '💙', color: '0, 212, 255' },
    { id: 2, name: '2 LDT', icon: '💜', color: '139, 92, 246' },
    { id: 3, name: '3 LDT', icon: '💖', color: '255, 0, 255' },
    { id: 4, name: '4 LDT', icon: '💚', color: '0, 255, 136' },
    { id: 5, name: '5 LDT', icon: '🧡', color: '255, 102, 0' },
    { id: 6, name: '6 LDT', icon: '❤️', color: '255, 23, 68' },
  ];



  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        
        await getAllCategoryCounts();
        await getAllPlatformCoupons();
        await getRemainingCouponsStats();
        await getRecentEvents();
        
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (wallet.contract && wallet.account) {
      loadStats();
    } else {
      setLoading(false);
    }
  }, [wallet.contract, wallet.account]);

  useEffect(() => {
    if (Array.isArray(allCoupons) && allCoupons.length > 0) {
      const sortedCoupons = [...allCoupons].sort((a, b) => b.timestamp - a.timestamp);
      setRecentCoupons(sortedCoupons.slice(0, 5));
    } else {
      setRecentCoupons([]);
    }
  }, [allCoupons, totalCouponsCount, totalCouponsValue]);

  useEffect(() => {
    if (Array.isArray(recentEvents) && recentEvents.length > 0) {
      const activities = recentEvents.slice(0, 6).map(event => ({
        text: event.text,
        time: event.timestamp,
        type: event.type,
        realTime: true
      }));
      
      setRecentActivity(activities);
    } else if (Array.isArray(allCoupons) && allCoupons.length > 0) {
      const activities = allCoupons
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 6)
        .map(coupon => {
          const category = categories.find(cat => cat.id === coupon.category);
          return {
            text: `새로운 ${category?.name || coupon.category + ' LDT'} 쿠폰이 등록되었습니다!`,
            time: coupon.timestamp,
            type: 'register',
            realTime: true
          };
        });
      
      setRecentActivity(activities);
    } else {
      setRecentActivity([
        { text: '아직 플랫폼 활동이 없습니다', time: Date.now(), type: 'system', realTime: true },
        { text: '첫 번째 쿠폰을 등록하거나 뽑기를 시도해보세요!', time: Date.now(), type: 'system', realTime: true }
      ]);
    }
  }, [recentEvents, allCoupons]);

  const formatValue = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '방금 전';
    
    // 실제 타임스탬프인지 확인
    const timeValue = typeof timestamp === 'number' ? timestamp : Date.now();
    const now = Date.now();
    const diff = now - timeValue;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  };

  if (loading) {
    return (
      <StatsContainer>
        <PageTitle>🚀 Drawzy 대시보드</PageTitle>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.5rem',
          color: '#00d4ff'
        }}>
          📊 전체 플랫폼 데이터 로딩 중...
        </div>
      </StatsContainer>
    );
  }

  // 컨트랙트가 연결되지 않은 경우
  if (!wallet.contract || !wallet.account) {
    return (
      <StatsContainer>
        <PageTitle>🚀 Drawzy 대시보드</PageTitle>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
          <div style={{ fontSize: '1.5rem', color: '#00d4ff', marginBottom: '15px' }}>
            지갑 연결 필요
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            플랫폼 통계를 확인하려면 먼저 지갑을 연결해주세요
          </div>
        </div>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <PageTitle>🚀 Drawzy 대시보드</PageTitle>
      
      {/* 첫 번째 줄: 3개 */}
      <StatsGrid>
        {/* 전체 쌓인 쿠폰 수 */}
        <StatsCard borderColor="#00d4ff" delay="0s">
          <CardHeader titleColor="#00d4ff">
            <div className="icon">🎫</div>
            <div className="title">전체 쌓인 쿠폰 수</div>
          </CardHeader>
          <CardContent valueColor="#00d4ff">
            <div className="value">
              {totalCouponsCount.toLocaleString()}
              {remainingCouponsCount > 0 && (
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginTop: '5px'
                }}>
                  (잔여 쿠폰: {remainingCouponsCount}개)
                </div>
              )}
            </div>
            <div className="description">
              현재 플랫폼에 등록되어 있는<br />
              전체 쿠폰의 개수입니다
            </div>
          </CardContent>
        </StatsCard>

        {/* 총 쿠폰 가치 */}
        <StatsCard borderColor="#00ff88" delay="0.2s">
          <CardHeader titleColor="#00ff88">
            <div className="icon">💰</div>
            <div className="title">총 쿠폰 가치</div>
          </CardHeader>
          <CardContent valueColor="#00ff88">
            <div className="value">
              {formatValue(totalCouponsValue)}원
              {remainingCouponsValue > 0 && (
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginTop: '5px'
                }}>
                  (잔여 가치: {formatValue(remainingCouponsValue)}원)
                </div>
              )}
            </div>
            <div className="description">
              등록된 모든 쿠폰의<br />
              총 금액 가치입니다
              {totalCouponsValue === 0 && <><br /><small>(쿠폰 등록 후 표시)</small></>}
            </div>
          </CardContent>
        </StatsCard>

        {/* 가격별 분포 */}
        <StatsCard borderColor="#ff00ff" delay="0.4s">
          <CardHeader titleColor="#ff00ff">
            <div className="icon">📊</div>
            <div className="title">가격별 분포</div>
          </CardHeader>
          <CategoryChart>
            {categories.map((category, index) => {
              // 남은 쿠폰 수 (현재 뽑을 수 있는 쿠폰)
              const remainingInCategory = Array.isArray(categoryCounts) ? (categoryCounts[index] || 0) : 0;
              // 전체 등록된 쿠폰 수 (allCoupons에서 해당 카테고리 필터링)
              const registeredInCategory = allCoupons.filter(coupon => coupon.category === category.id).length;
              
              return (
                <CategoryItem key={category.id} bgColor={category.color}>
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-name">{category.name}</div>
                  <div className="category-count">
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      등록: {registeredInCategory}개
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      opacity: 0.8, 
                      marginTop: '2px',
                      color: remainingInCategory === 0 ? '#ff4757' : 'inherit'
                    }}>
                      잔여: {remainingInCategory}개
                    </div>
                  </div>
                </CategoryItem>
              );
            })}
          </CategoryChart>
        </StatsCard>
      </StatsGrid>

      {/* 두 번째 줄: 2개 */}
      <SecondRow>
        {/* 실시간 유저 활동 */}
        <StatsCard borderColor="#ff6600" delay="0.6s">
          <CardHeader titleColor="#ff6600">
            <div className="icon">⚡</div>
            <div className="title">실시간 유저 활동</div>
          </CardHeader>
          <div style={{ 
            fontSize: '0.8rem', 
            color: 'rgba(255, 255, 255, 0.5)', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            마지막 업데이트: {new Date().toLocaleTimeString()}
          </div>
          
          <ActivityFeed>
            {Array.isArray(recentActivity) && recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '8px',
                  borderLeft: '3px solid #ff00ff',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <div>
                    {activity.text}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.8rem',
                    marginTop: '4px'
                  }}>
                    {formatTime(activity.time)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.5)', 
                textAlign: 'center', 
                padding: '20px' 
              }}>
                아직 플랫폼 활동이 없습니다
                <br />
                <small>첫 번째 쿠폰을 등록하거나 뽑기를 시도해보세요!</small>
              </div>
            )}
          </ActivityFeed>
        </StatsCard>

        {/* 최근 추가된 쿠폰 */}
        <StatsCard borderColor="#8B5CF6" delay="0.8s">
          <CardHeader titleColor="#8B5CF6">
            <div className="icon">🆕</div>
            <div className="title">최근 추가된 쿠폰</div>
          </CardHeader>
          <RecentList>
            {recentCoupons.length > 0 ? (
              recentCoupons.map((coupon, index) => {
                const category = categories.find(cat => cat.id === coupon.category);
                return (
                  <RecentItem 
                    key={index} 
                    categoryColor={`rgb(${category?.color || '255, 255, 255'})`}
                  >
                    <div className="coupon-name">{coupon.name || '쿠폰명 없음'}</div>
                    <div className="coupon-info">
                      <span className="coupon-category">{category?.name || coupon.category + ' LDT'}</span>
                      <span>{formatValue(coupon.realPrice || 0)}원</span>
                      <span>{formatTime(coupon.timestamp)}</span>
                    </div>
                  </RecentItem>
                );
              })
            ) : (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.5)', 
                textAlign: 'center', 
                padding: '20px' 
              }}>
                아직 등록된 쿠폰이 없습니다<br />
                <small>상품권 등록 탭에서 첫 번째 쿠폰을 등록해보세요!</small>
              </div>
            )}
          </RecentList>
        </StatsCard>
      </SecondRow>
    </StatsContainer>
  );
};

export default StatsPage; 