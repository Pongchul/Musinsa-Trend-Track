import styled from "@emotion/styled";

export const Section = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewAll = styled.span`
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 80px 64px;
  gap: 8px;
  padding: 0 0 8px 0;
  border-bottom: 1px solid #eee;
`;

export const TableHeaderCell = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #bbb;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;
