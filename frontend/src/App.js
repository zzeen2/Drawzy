import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import DrawPage from './components/Draw/DrawPage';
import MyItemsPage from './components/MyItems/MyItemsPage';
import StatsPage from './components/Stats/StatsPage';
import RegisterCouponPage from './components/Admin/RegisterCouponPage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
    color: white;
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* 네온 스크롤바 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #00d4ff, #ff00ff);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #ff00ff, #00d4ff);
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/draw" element={<DrawPage />} />
          <Route path="/my-items" element={<MyItemsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/register-coupon" element={<RegisterCouponPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
