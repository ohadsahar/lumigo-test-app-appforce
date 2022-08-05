import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  width: 100%;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  grid-column-gap: 0.8vw;
  align-items: center;
`;

export const DayWrapper = styled.div`
  display: flex;
`;

export const YearAndMonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
