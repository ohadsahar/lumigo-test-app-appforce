import styled from "styled-components";

export const TasksWrapper = styled.div<any>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

export const TaskTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 0.5vw;
  cursor: pointer;
`;

export const DownArrowWrapper = styled.div`
  font-size: 2vw;
  color: white;
`;

export const TasksLayout = styled.div<any>`
  transform: ${(props) =>
    props.isOpen ? "translateX(120%)" : "translateX(0%)"};
  transition: 1s ease-in;
`;
