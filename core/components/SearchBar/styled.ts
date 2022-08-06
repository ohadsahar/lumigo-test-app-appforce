import styled from 'styled-components';

export const FormWrapper = styled.form`
  width: 100%;
  padding: 0.5vh 0vh;
`;

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
  margin-bottom:1vh;

  ::placeholder {
    color: #aaaaaf;
  }

  :focus { 
    color:white;
  }
}
`;
