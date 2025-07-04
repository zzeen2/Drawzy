import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet, useToken } from '../../hooks';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 212, 255, 0.3);
  padding: 20px;
  z-index: 10;
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(45deg, #00d4ff, #ff00ff, #00ff88);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }
`;

const NavMenu = styled.nav`
  margin-bottom: 30px;
`;

const NavItem = styled.div`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    color: #00d4ff;
    transform: translateX(5px);
  }
  
  &.active {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 255, 0.2));
    color: #00d4ff;
    border: 1px solid rgba(0, 212, 255, 0.3);
  }
`;

const WalletSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WalletButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #00d4ff, #ff00ff);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WalletInfo = styled.div`
  margin-top: 15px;
  
  .address {
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
    margin-bottom: 8px;
    word-break: break-all;
    position: relative;
  }
  
  .address-changed {
    animation: addressChange 0.5s ease-in-out;
  }
  
  @keyframes addressChange {
    0% { background: rgba(0, 212, 255, 0.3); }
    100% { background: transparent; }
  }
  
  .network {
    color: ${props => props.isCorrect ? '#00ff88' : '#ff4757'};
    font-size: 11px;
    margin-bottom: 8px;
  }
  
  .balance {
    color: #00d4ff;
    font-weight: bold;
    font-size: 14px;
  }
  
  .wallet-status {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 5px;
    text-align: center;
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 11;
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  color: #00d4ff;
  padding: 8px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevAccount, setPrevAccount] = useState(null);
  const [isAccountChanged, setIsAccountChanged] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = useWallet();
  const { account, connectWallet, isNetwork } = wallet;
  const { balance, hasClaimed, getInitialTokens, loading } = useToken(wallet);

  React.useEffect(() => {
    if (account && prevAccount && account !== prevAccount) {
      setIsAccountChanged(true);
      
      setTimeout(() => {
        setIsAccountChanged(false);
      }, 3000);
    }
    setPrevAccount(account);
  }, [account, prevAccount]);

  const navItems = [
    { id: 'home', label: '🏠 홈', path: '/' },
    { id: 'draw', label: '🎲 상품권 뽑기', path: '/draw' },
    { id: 'items', label: '🎁 내 상품권', path: '/my-items' },
    { id: 'stats', label: '📊 대시보드', path: '/stats' },
    { id: 'register', label: '🎫 상품권 등록', path: '/register-coupon' },
  ];

  const handleNavClick = (item) => {
    navigate(item.path);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <MobileToggle onClick={() => setIsOpen(!isOpen)}>
        ☰
      </MobileToggle>
      
      <SidebarContainer isOpen={isOpen}>
        <Logo>
          <h1>Drawzy</h1>
          <p>LuckyDraw Token Marketplace</p>
        </Logo>
        
        <NavMenu>
          {navItems.map(item => (
            <NavItem
              key={item.id}
              className={isActive(item.path) ? 'active' : ''}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </NavItem>
          ))}
        </NavMenu>
        
        <WalletSection>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '16px' }}>
            💰 내 지갑
          </h3>
          
          {account ? (
            <WalletInfo isCorrect={isNetwork}>
              {isAccountChanged && (
                <div className="wallet-status">
                  🔄 지갑이 전환되었습니다
                </div>
              )}
              <div className={`address ${isAccountChanged ? 'address-changed' : ''}`}>
                지갑 주소: {formatAddress(account)}
              </div>
              <div className="network">
                네트워크: {isNetwork ? 'Sepolia ✓' : '❌ 잘못된 네트워크'}
              </div>
              <div className="balance">
                토큰 잔액: {balance} LDT
              </div>
              {!hasClaimed && (
                <button
                  onClick={getInitialTokens}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    background: 'rgba(0, 255, 136, 0.1)',
                    color: '#00ff88',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {loading ? '받는 중...' : '🎁 가입 토큰 받기'}
                </button>
              )}
            </WalletInfo>
          ) : (
            <WalletButton onClick={connectWallet} disabled={loading}>
              {loading ? '지갑 연결 중...' : '지갑 연결'}
            </WalletButton>
          )}
        </WalletSection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 