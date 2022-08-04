import { TaskStatusType } from "@/constants/task_status";
import { RootState } from "@/redux/store";
import { TaskProps } from "interfaces/task_props.interface";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useProgressLine = () => {
  const { tasks } = useSelector((state: RootState) => state.taskState);

  const tasksPercentage = useMemo(
    () =>
      tasks?.filter((task: TaskProps) => task.status === TaskStatusType.CREATED)
        .length ?? 0,
    [tasks]
  );
  const toDoTasksPercentage = useMemo(
    () =>
      tasks?.filter((task: TaskProps) => task.status === TaskStatusType.PENDING)
        .length ?? 0,
    [tasks]
  );
  const completedTasksPercentage = useMemo(
    () =>
      tasks?.filter(
        (task: TaskProps) => task.status === TaskStatusType.COMPLETED
      ).length ?? 0,
    [tasks]
  );
  const totalTasks =
    tasksPercentage + toDoTasksPercentage + completedTasksPercentage;

  const calculatePercentage = (amount: number) => {
    const value = (amount / totalTasks) * 100;
    return `${value}`;
  };
  return {
    tasksPercentage,
    toDoTasksPercentage,
    completedTasksPercentage,
    totalTasks,
    calculatePercentage,
  };
};
