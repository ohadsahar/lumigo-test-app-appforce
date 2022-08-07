import { useProgressLine } from './hooks/useProgressLine';
import {
  GreenWrapper,
  GreyWrapper,
  ProgressLineWrapper,
  YellowWrapper,
} from './styled';

const ProgressLine = () => {
  const {
    tasksPercentage,
    toDoTasksPercentage,
    completedTasksPercentage,
    totalTasks,
    calculatePercentage,
  } = useProgressLine();

  return (
    <ProgressLineWrapper
      data-testid="progress-line-box"
      tasksPercentage={
        totalTasks > 0 ? calculatePercentage(tasksPercentage) : '100'
      }
      toDotasksPercentage={
        totalTasks > 0 ? calculatePercentage(toDoTasksPercentage) : '0'
      }
      completedtasksPercentage={
        totalTasks > 0 ? calculatePercentage(completedTasksPercentage) : '0'
      }
    >
      <GreenWrapper
        total={totalTasks}
        toDoLength={toDoTasksPercentage}
        completedLength={completedTasksPercentage}
      />
      <YellowWrapper
        total={totalTasks}
        toDoLength={toDoTasksPercentage}
        completedLength={completedTasksPercentage}
      />
      <GreyWrapper
        total={totalTasks}
        toDoLength={toDoTasksPercentage}
        completedLength={completedTasksPercentage}
      />
    </ProgressLineWrapper>
  );
};

export default ProgressLine;
