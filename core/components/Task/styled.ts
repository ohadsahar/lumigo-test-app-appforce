import styled from "styled-components";

export const CardTask = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.third};
  padding: 1.2rem;
  border-radius: 4px;
  margin-top: .5rem;
`;

export const CardDetailsWrapper = styled.div`
  color: white;
  font-size: 1.2vw;
`;
