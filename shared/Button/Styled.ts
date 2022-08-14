import styled from 'styled-components';

export const AppButtonWrapper = styled.button`
  padding: 8px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 8px;
  margin: auto;
  color: white;
  border: 1px solid white;
  width: 100%;
`;
