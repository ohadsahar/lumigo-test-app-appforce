import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import {
  deleteTask,
  editTask,
  finishTask,
  loadTasks,
  stopTask,
} from "@/store/actions/tasks.actions";
import { RootState } from "@/store/store";
import { TaskProps } from "interfaces/task_props.interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTasks = () => {
  const { tasks } = useSelector((state: RootState) => state.taskState);
  const [doLaterOpen, setDoLaterOpen] = useState<boolean>(false);
  const [completedOpen, setCompletedOpen] = useState<boolean>(false);

  const taskPendingCount = useMemo(() => {
    return (
      tasks?.filter((task: TaskProps) => task.status === TaskStatusType.PENDING)
        .length ?? 0
    );
  }, [tasks]);

  const taskCompletedCount = useMemo(() => {
    return (
      tasks?.filter(
        (task: TaskProps) => task.status === TaskStatusType.COMPLETED
      ).length ?? 0
    );
  }, [tasks]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks() as any);
  }, []);

  const handleEdit = useCallback((task: TaskProps) => {
    dispatch(editTask({ ...task, editable: true }) as any);
  }, []);

  const handleAction = useCallback((action: string, task: TaskProps) => {
    switch (action) {
      case Strings.TaskActionPause:
        dispatch(stopTask(task) as any);
        break;
      case Strings.TaskActionRemove:
        dispatch(deleteTask(task) as any);
        break;
      case Strings.TaskActionDone:
        dispatch(finishTask(task) as any);
        break;
      default:
        break;
    }
  }, []);

  return {
    tasks,
    taskPendingCount,
    taskCompletedCount,
    handleEdit,
    handleAction,
    doLaterOpen,
    completedOpen,
    setDoLaterOpen,
    setCompletedOpen,
  };
};
