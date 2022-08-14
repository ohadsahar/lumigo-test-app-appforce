import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.third};
`;

export const LoginFormWrapper = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1vh;
  border: 2px solid black;
  height: 50vh;
  border-radius: 8px;
  margin: auto;
  width: 40%;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 1vh;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 2vh;
`;

export const HintWrapper = styled.div`
  color: white;
  text-align: center;
  padding-bottom: 1vh;
  font-weight: bold;
  cursor: pointer;
`;
