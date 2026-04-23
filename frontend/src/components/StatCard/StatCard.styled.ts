import styled from '@emotion/styled';

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  min-width: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const IconWrap = styled.div<{ bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

export const Badge = styled.span<{ color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ color }) => color};
`;

export const Label = styled.p`
  font-size: 13px;
  color: #888;
  margin: 0;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin-top: 4px;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #aaa;
  margin-left: 10px;
`;

