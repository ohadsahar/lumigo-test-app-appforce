import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import {
  deleteTask,
  editTask,
  finishTask,
  loadTasks,
  stopTask,
} from "@/store/actions/tasks.actions";
import { TaskProps } from "interfaces/task_props.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompletedTasksList from "../CompletedTasksList/completed_tasks_list";
import CreatedTasksList from "../CreatedTasksList/created_tasks_list";
import DoLaterTasksList from "../ToDoLaterTasksList/do_later_tasks_list";
const Tasks = () => {
  const dispatch = useDispatch();
  const [doLaterOpen, setDoLaterOpen] = useState<boolean>(false);
  const [completedOpen, setCompletedOpen] = useState<boolean>(false);
  const { tasks } = useSelector((state: any) => state.taskState);
  let taskPendingCount = 0,
    taskCompletedCount = 0;
  if (tasks) {
    taskPendingCount =
      tasks?.filter((task: TaskProps) => task.status === TaskStatusType.PENDING)
        .length ?? 0;

    taskCompletedCount =
      tasks?.filter(
        (task: TaskProps) => task.status === TaskStatusType.COMPLETED
      ).length ?? 0;
  }

  useEffect(() => {
    dispatch(loadTasks() as any);
  }, []);

  const handleAction = (action: string, task: any) => {
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
  };

  const onEdit = (task: TaskProps) => {
    task.editable = true;
    dispatch(editTask(task) as any);
  };

  return (
    <>
      <CreatedTasksList
        tasks={tasks}
        handleAction={handleAction}
        onEdit={onEdit}
      />
      <DoLaterTasksList
        doLaterOpen={doLaterOpen}
        tasks={tasks}
        handleAction={handleAction}
        onEdit={onEdit}
        taskPendingCount={taskPendingCount}
        setDoLaterOpen={setDoLaterOpen}
      />
      <CompletedTasksList
        setCompletedOpen={setCompletedOpen}
        taskCompletedCount={taskCompletedCount}
        completedOpen={completedOpen}
        tasks={tasks}
        handleAction={handleAction}
        onEdit={onEdit}
      />
    </>
  );
};

export default Tasks;
