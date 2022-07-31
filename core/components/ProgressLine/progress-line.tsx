import { TaskStatusType } from "@/constants/task_status";
import { TaskProps } from "interfaces/task_props.interface";
import { useSelector } from "react-redux";
import {
  GreenWrapper,
  GreyWrapper,
  ProgressLineWrapper,
  YellowWrapper,
} from "./styled";

const ProgressLine = () => {
  const { tasks } = useSelector((state: any) => state.taskState);

  const tasksPercentage =
    tasks?.filter((task: TaskProps) => task.status === TaskStatusType.CREATED)
      .length ?? 0;
  const toDoTasksPercentage =
    tasks?.filter((task: TaskProps) => task.status === TaskStatusType.PENDING)
      .length ?? 0;
  const completedTasksPercentage =
    tasks?.filter((task: TaskProps) => task.status === TaskStatusType.COMPLETED)
      .length ?? 0;
  const totalTasks =
    tasksPercentage + toDoTasksPercentage + completedTasksPercentage;

  const calculatePercentage = (amount: number) => {
    const value = (amount / totalTasks) * 100;
    return `${value}`;
  };

  return (
    <ProgressLineWrapper
      tasksPercentage={
        totalTasks > 0 ? calculatePercentage(tasksPercentage) : "100"
      }
      toDotasksPercentage={
        totalTasks > 0 ? calculatePercentage(toDoTasksPercentage) : "0"
      }
      completedtasksPercentage={
        totalTasks > 0 ? calculatePercentage(completedTasksPercentage) : "0"
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
