import styled from '@emotion/styled';

export const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 64px;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.35);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(59, 130, 246, 0.45);
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;
  margin-left: 40px;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 12px 16px;
  width: 350px;
  color: #999;
  font-size: 14px;
  cursor: text;
`;

export const NavRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NavLink = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
      color: #0070f3;
      transform: translateY(-1px);
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e0c9a6;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
