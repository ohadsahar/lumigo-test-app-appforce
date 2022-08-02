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
  taskCompletedCount?: number;
  handleAction: Function;
  handleEdit: Function;
  doLaterOpen?: boolean;
  taskPendingCount?: number;
  setDoLaterOpen?: Dispatch<SetStateAction<boolean>>;
  setCompletedOpen?: Dispatch<SetStateAction<boolean>>;
  listName: TaskStatusType;
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
            {!task.editMode ? (
              <Task
                showCheck={listName !== TaskStatusType.COMPLETED ?? false}
                showPause={
                  (listName === TaskStatusType.COMPLETED ||
                    listName === TaskStatusType.CREATED) ??
                  false
                }
                task={task}
                handleAction={(data: string) => handleAction(data, task)}
                handleEdit={() => handleEdit(task)}
              />
            ) : (
              <TaskForm {...task} />
            )}
          </div>
        ))}
      </TasksLayout>
    </TasksWrapper>
  );
};

export default TasksList;
