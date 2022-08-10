import { Strings } from '@/constants/Strings';
import { TaskStatusType } from '@/constants/TaskStatus';
import {
  deleteTask,
  editTask,
  finishTask,
  loadTasks,
  stopTask,
} from '@/redux/actions/Tasks';
import { RootState } from '@/redux/store';
import { TaskProps } from 'models/TaskProps.model';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTasks = () => {
  const { tasks } = useSelector((state: RootState) => state.taskState);
  const [doLaterOpen, setDoLaterOpen] = useState<boolean>(false);
  const [completedOpen, setCompletedOpen] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks() as any);
  }, [dispatch]);

  const createdTasks = tasks?.filter(
    (task: TaskProps) => task.status === TaskStatusType.CREATED
  );
  const toDoLaterTasks = tasks?.filter(
    (task: TaskProps) => task.status === TaskStatusType.PENDING
  );
  const completedTasks = tasks?.filter(
    (task: TaskProps) => task.status === TaskStatusType.COMPLETED
  );

  const taskPendingCount = toDoLaterTasks?.length;
  const taskCompletedCount = completedTasks?.length;

  const handleEdit = useCallback((task: TaskProps) => {
    dispatch(editTask(task) as any);
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
    createdTasks,
    toDoLaterTasks,
    completedTasks,
    taskPendingCount,
    taskCompletedCount,
    handleEdit,
    handleAction,
    doLaterOpen,
    completedOpen,
    setDoLaterOpen,
    setCompletedOpen,
    editTaskId,
    setEditTaskId,
  };
};
