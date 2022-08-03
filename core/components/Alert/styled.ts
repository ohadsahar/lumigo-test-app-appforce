import styled from "styled-components";

type AlertParagraphProps = {
  danger: boolean;
};

export const AlertParagraph = styled.p<AlertParagraphProps>`
  background-color: ${(props: AlertParagraphProps) =>
    props.danger ? "red" : "#67c967"};
  color: white;
  margin: 0.5rem 0.5rem;
  border-radius: 0.4rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: 1s ease-in;
`;
