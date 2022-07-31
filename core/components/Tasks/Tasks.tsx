import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import Task from "@/core/components/Task/Task";
import TaskForm from "@/core/components/TaskForm/task_form";
import AppTitle from "@/shared/typography/app_title";
import {
  deleteTask,
  editTask,
  finishTask,
  loadTasks,
  stopTask,
} from "@/store/actions/tasks.actions";
import { TaskProps } from "interfaces/task_props.interface";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  DownArrowWrapper,
  TasksLayout,
  TasksWrapper,
  TaskTitleWrapper,
} from "./styled";
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
      <TasksWrapper>
        <TasksLayout>
          {tasks?.length > 0 &&
            tasks?.map((task: TaskProps) => (
              <div key={task.id}>
                {task.status === TaskStatusType.CREATED ? (
                  !task?.editable ? (
                    <Task
                      task={task}
                      handleAction={(data: string) => handleAction(data, task)}
                      handleEdit={() => onEdit(task)}
                    />
                  ) : (
                    <TaskForm task={task} />
                  )
                ) : (
                  <></>
                )}
              </div>
            ))}
        </TasksLayout>
      </TasksWrapper>
      <TasksWrapper>
        <TaskTitleWrapper onClick={() => setDoLaterOpen(!doLaterOpen)}>
          <DownArrowWrapper>
            {doLaterOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.DoLaterListName} (${taskPendingCount})`}
            fontWeight={"bold"}
            fontSize={"2vw"}
          />
        </TaskTitleWrapper>
        {!doLaterOpen ? (
          <TasksLayout isOpen={doLaterOpen}>
            {tasks?.length > 0 &&
              tasks?.map((task: TaskProps) =>
                task.status === TaskStatusType.PENDING ? (
                  <div key={task?.id}>
                    {!task.editable ? (
                      <Task
                        showPause={false}
                        task={task}
                        handleAction={(data: string) =>
                          handleAction(data, task)
                        }
                        handleEdit={() => onEdit(task)}
                      />
                    ) : (
                      <TaskForm task={task} />
                    )}
                  </div>
                ) : null
              )}
          </TasksLayout>
        ) : (
          <></>
        )}
      </TasksWrapper>
      <TasksWrapper>
        <TaskTitleWrapper onClick={() => setCompletedOpen(!completedOpen)}>
          <DownArrowWrapper>
            {completedOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.CompletedListName} (${taskCompletedCount})`}
            fontWeight={"bold"}
            fontSize={"2vw"}
          />
        </TaskTitleWrapper>
        {!completedOpen ? (
          <TasksLayout isOpen={completedOpen}>
            {tasks?.length > 0 &&
              tasks?.map((task: TaskProps) =>
                task.status === TaskStatusType.COMPLETED ? (
                  <div key={task?.id}>
                    {!task?.editable ? (
                      <Task
                        showCheck={false}
                        task={task}
                        handleAction={(data: string) =>
                          handleAction(data, task)
                        }
                        handleEdit={() => onEdit(task)}
                      />
                    ) : (
                      <TaskForm task={task} />
                    )}
                  </div>
                ) : null
              )}
          </TasksLayout>
        ) : null}
      </TasksWrapper>
    </>
  );
};

export default Tasks;
