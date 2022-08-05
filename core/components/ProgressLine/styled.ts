import styled from 'styled-components';

interface Count {
  total: number;
  toDoLength: number;
  completedLength: number;
}

interface ProgressLineProps {
  tasksPercentage: string;
  toDotasksPercentage: string;
  completedtasksPercentage: string;
  total?: number;
}

export const ProgressLineWrapper = styled.div<ProgressLineProps>`
  height: 2vh;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props: ProgressLineProps) =>
      props.completedtasksPercentage}% ${(props: ProgressLineProps) =>
      props.toDotasksPercentage}% ${(props: ProgressLineProps) =>
      props.tasksPercentage}%;
`;

export const GreenWrapper = styled.div<Count>`
  background-color: #67c967;
  border-radius: ${(props: Count) =>
    props.total === 0 || props.toDoLength === 0
      ? '8px'
      : props.toDoLength >= 1
      ? '8px 0px 0px 8px;'
      : '0px 8px 8px 0px'};
`;

export const YellowWrapper = styled.div<Count>`
  background-color: #f9f957;
  border-radius: ${(props: Count) =>
    props.total === 0 || props.completedLength === 0
      ? '8px'
      : '0px 8px 8px 0px'};
`;

export const GreyWrapper = styled.div<Count>`
  background-color: #2c2b2b;
  border-radius: ${(props: Count) =>
    props.total === 0 || (props.completedLength === 0 && props.toDoLength === 0)
      ? '8px'
      : '0px 8px 8px 0px'};
`;
