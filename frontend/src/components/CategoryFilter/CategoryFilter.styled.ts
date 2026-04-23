import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Chip = styled.button<{ active: boolean }>`
  display: flex;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 24px;
  border: 1.5px solid ${({ active }) => (active ? 'transparent' : '#e0e0e0')};
  background: ${({ active }) => (active ? '#111' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#444')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: ${({ active }) => (active ? '#111' : '#f5f5f5')};
    border-color: ${({ active }) => (active ? 'transparent' : '#bbb')};
  }
`;
