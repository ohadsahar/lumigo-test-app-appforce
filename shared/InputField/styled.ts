import styled from 'styled-components';

export const InputFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.input`
  width:100%;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 1.2rem;
  border: none;
  outline-color: white;
  color:white;

  ::placeholder {
    color: #aaaaaf;
  }

  :focus { 
    color:white;
  }
}
`;

export const AddWrapper = styled.div`
  position: absolute;
  right: 1vw;
  cursor: pointer;
  > svg {
    color: white;
    font-size: 1.8vw;
  }
`;
