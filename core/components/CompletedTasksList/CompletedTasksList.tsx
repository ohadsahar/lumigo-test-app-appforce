import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import Task from "@/core/components/Task/Task";
import TaskForm from "@/core/components/TaskForm/TaskForm";
import AppTitle from "@/shared/typography/app_title";
import { TaskProps } from "interfaces/task_props.interface";
import { Dispatch, SetStateAction } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import {
  DownArrowWrapper,
  TasksLayout,
  TasksWrapper,
  TaskTitleWrapper,
} from "../Tasks/styled";

interface CompletedTasksListProps {
  tasks: TaskProps[];
  completedOpen: boolean;
  taskCompletedCount: number;
  setCompletedOpen: Dispatch<SetStateAction<boolean>>;
  handleAction: Function;
  handleEdit: Function;
}

const CompletedTasksList = ({
  tasks,
  handleAction,
  handleEdit,
  setCompletedOpen,
  taskCompletedCount,
  completedOpen,
}: CompletedTasksListProps) => {
  return (
    <TasksWrapper>
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
      {!completedOpen && (
        <TasksLayout isOpen={completedOpen}>
          {tasks?.map((task: TaskProps) => (
            <div key={task?.id}>
              {!task.editMode ? (
                <Task
                  showCheck={false}
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
      )}
    </TasksWrapper>
  );
};

export default CompletedTasksList;
