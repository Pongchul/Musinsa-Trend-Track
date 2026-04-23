import styled from '@emotion/styled';
import {css} from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f7f8fa;
    color: #111;
  }
`;

export const PageWrapper = styled.div`
  padding-top: 64px;
`;

export const Container = styled.main`
  max-width: 1200px;
  //margin: 0 auto;
  padding: 40px 70px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const PageTitle = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 800;
    color: #111;
    margin-bottom: 6px;
  }
  p {
    font-size: 17px;
    color: #888;
  }
`;

export const StatsRow = styled.div`
  padding: 1px 70px;
  display: flex;
  gap: 20px;
`;

export const TablesRow = styled.div`
  padding: 40px 70px;
  display: flex;
  gap: 32px;
`;
