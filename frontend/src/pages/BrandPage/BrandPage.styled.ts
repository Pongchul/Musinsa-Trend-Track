import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const globalStyles = css`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f9fafb;
    color: #111;
  }
`;

export const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PageTitle = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 800;
    color: #111;
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
    color: #6b7280;
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
