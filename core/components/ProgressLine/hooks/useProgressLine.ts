import { TaskStatusType } from "@/constants/TaskStatus";
import { RootState } from "@/redux/store";

import { TaskProps } from "models/TaskProps.model";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useProgressLine = () => {
  const { tasks } = useSelector((state: RootState) => state.taskState);

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
  return {
    tasksPercentage,
    toDoTasksPercentage,
    completedTasksPercentage,
    totalTasks,
    calculatePercentage,
  };
};
