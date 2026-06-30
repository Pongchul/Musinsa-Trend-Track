import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
    width: 100%;
    padding: 40px 70px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const PageTitle = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 800;
    color: #111;
    margin-bottom: 6px;
  }
  p {
    font-size: 15px;
    color: #888;
  }
`;

/* ── Filter Card ── */
export const FilterCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px 18px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 0.08em;
`;

export const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #f7f8fa;
  border: 1.5px solid #eee;
  border-radius: 10px;
  padding: 0 14px;
  height: 42px;
  gap: 8px;
  min-width: 280px;

  input {
    border: none;
    background: transparent;
    font-size: 14px;
    color: #555;
    outline: none;
    width: 100%;
    font-family: inherit;

    &::placeholder {
      color: #bbb;
    }
  }
`;

export const SearchIcon = styled.span`
  color: #bbb;
  display: flex;
  align-items: center;
`;

export const DateInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f8fa;
  border: 1.5px solid #eee;
  border-radius: 10px;
  padding: 0 14px;
  height: 42px;
  min-width: 148px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  gap: 8px;
`;

export const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2px;
  margin: 0 -4px;
  padding-top: 20px;
`;

export const CategorySelect = styled.div`
  background: #f7f8fa;
  border: 1.5px solid #eee;
  border-radius: 10px;
  height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;

  select {
    border: none;
    background: transparent;
    font-size: 14px;
    color: #333;
    font-family: inherit;
    outline: none;
    cursor: pointer;
    min-width: 130px;
  }
`;

export const ApplyBtn = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  height: 42px;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: background 0.15s;

  &:hover {
    background: #1d4ed8;
  }
`;

export const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Tag = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#eff6ff' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#2563eb' : '#555')};
  border: 1.5px solid ${({ active }) => (active ? '#bfdbfe' : 'transparent')};
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #eff6ff;
    color: #2563eb;
  }
`;

export const ResetBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  padding: 4px 6px;

  &:hover {
    color: #333;
  }
`;

/* ── Table Card ── */
export const TableCard = styled.div`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    overflow: hidden;
    width: 100%;           // ← 추가
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background: #fafafa;
  border-bottom: 1.5px solid #f0f0f0;
`;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  padding: 14px 20px;
  font-size: 11px;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 0.07em;
  text-align: left;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafcff;
  }
`;

export const Td = styled.td`
  padding: 18px 20px;
  vertical-align: middle;
`;

export const TrendBadge = styled.span<{ dir: 'up' | 'down' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${({ dir }) => (dir === 'up' ? '#eff6ff' : '#fff1f2')};
  color: ${({ dir }) => (dir === 'up' ? '#2563eb' : '#e11d48')};
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const ProductImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  object-fit: cover;
  background: #f0f0f0;
`;

export const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const BrandName = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #aaa;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const ProductName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111;
`;

export const CategoryBadge = styled.span`
  background: #f3f4f6;
  color: #555;
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 500;
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111;
`;

export const ActionBtn = styled.button`
  background: none;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: all 0.15s;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
    background: #eff6ff;
  }
`;

/* ── Pagination ── */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1.5px solid #f0f0f0;
`;

export const ShowingText = styled.span`
  font-size: 13px;
  color: #888;

  strong {
    color: #333;
  }
`;

export const PaginationRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageBtn = styled.button<{ active?: boolean; disabled?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1.5px solid ${({ active }) => (active ? '#2563eb' : 'transparent')};
  background: ${({ active }) => (active ? '#2563eb' : 'transparent')};
  color: ${({ active, disabled }) => (active ? '#fff' : disabled ? '#ccc' : '#555')};
  font-size: 14px;
  font-family: inherit;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ active }) => (active ? '#1d4ed8' : '#f0f4ff')};
    color: ${({ active }) => (active ? '#fff' : '#2563eb')};
  }
`;
