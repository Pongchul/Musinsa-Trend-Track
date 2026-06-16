import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
`;

export const RankCol = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const RankNum = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111;
`;

export const RankChange = styled.span<{ up: boolean }>`
  font-size: 11px;
  font-weight: 600;
  background: ${({ up }) => (up ? '#eff6ff' : '#fef2f2')};
  color: ${({ up }) => (up ? '#ef4444' : '#3b82f6')};
  padding: 2px 6px;
  border-radius: 8px;
`;

export const ProductImage = styled.div`
    width: 60px;       /* 원하는 가로 크기 */
    height: 80px;      /* 3:4 비율 */
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;     /* 잘리는 게 싫으면 contain으로 */
        object-position: center top;  /* 상품 상단(얼굴/로고)이 잘리지 않게 */
        display: block;
    }
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
  margin: 10px;
`;

export const ProductName = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #111;
`;

export const BrandName = styled.p`
  margin: 0;
  font-size: 13px;
  color: #999;
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  min-width: 80px;
  text-align: right;
`;
