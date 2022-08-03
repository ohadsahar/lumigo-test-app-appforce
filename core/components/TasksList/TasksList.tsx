import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import AppTitle from "@/shared/typography/app_title";
import { TaskProps } from "interfaces/task_props.interface";
import { Dispatch, SetStateAction } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import {
  DownArrowWrapper,
  TasksLayout,
  TasksWrapper,
  TaskTitleWrapper,
} from "../Tasks/styled";

interface TaskListProps {
  tasks: TaskProps[];
  completedOpen?: boolean;
  doLaterOpen?: boolean;
  taskCompletedCount?: number;
  taskPendingCount?: number;
  editTaskId: string;
  listName: TaskStatusType;
  handleAction: (action: string, task?: TaskProps) => void;
  handleEdit: (task: TaskProps) => void;
  setDoLaterOpen?: Dispatch<SetStateAction<boolean>>;
  setCompletedOpen?: Dispatch<SetStateAction<boolean>>;
  setEditTaskId: Dispatch<SetStateAction<string>>;
}
const TasksList = ({
  tasks,
  handleAction,
  handleEdit,
  completedOpen,
  taskCompletedCount,
  doLaterOpen,
  taskPendingCount,
  setDoLaterOpen,
  setCompletedOpen,
  listName,
  editTaskId,
  setEditTaskId,
}: TaskListProps) => {
  return (
    <TasksWrapper>
      {listName === TaskStatusType.PENDING && setDoLaterOpen && (
        <TaskTitleWrapper onClick={() => setDoLaterOpen(!doLaterOpen)}>
          <DownArrowWrapper>
            {doLaterOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.DoLaterListName} (${taskPendingCount})`}
            fontWeight="bold"
            fontSize="2vw"
          />
        </TaskTitleWrapper>
      )}
      {listName === TaskStatusType.COMPLETED && setCompletedOpen && (
        <TaskTitleWrapper onClick={() => setCompletedOpen(!completedOpen)}>
          <DownArrowWrapper>
            {completedOpen ? <FaAngleDown /> : <FaAngleRight />}
          </DownArrowWrapper>
          <AppTitle
            title={`${Strings.CompletedListName} (${taskCompletedCount})`}
            fontWeight="bold"
            fontSize="2vw"
          />
        </TaskTitleWrapper>
      )}
      <TasksLayout>
        {tasks?.map((task: TaskProps) => (
          <div key={task.id}>
            {task.id !== editTaskId ? (
              <Task
                setCurrentEdit={() => setEditTaskId(task.id)}
                showCheck={listName !== TaskStatusType.COMPLETED ?? false}
                showPause={[
                  TaskStatusType.COMPLETED,
                  TaskStatusType.CREATED,
                ].includes(listName)}
                task={task}
                handleAction={(data: string) => handleAction(data, task)}
                handleEdit={() => handleEdit(task)}
              />
            ) : (
              <TaskForm handleEditClick={() => setEditTaskId("")} {...task} />
            )}
          </div>
        ))}
      </TasksLayout>
    </TasksWrapper>
  );
};
export default TasksList;
