import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  height: 100vh;
  padding: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2.5vh;
  position: relative;
`;

export const TopSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 4vh;
  width: 100%;
  overflow-y: scroll;
  height: 55vh;
`;
