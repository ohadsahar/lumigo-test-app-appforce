import { TaskStatusType } from "@/constants/task_status";

import { TaskProps } from "interfaces/task_props.interface";
import React, { Dispatch, SetStateAction } from "react";
import Task from "@/core/components/Task/Task";
import TaskForm from "../TaskForm/task_form";
import {
  DownArrowWrapper,
  TasksLayout,
  TasksWrapper,
  TaskTitleWrapper,
} from "../Tasks/styled";
import { Strings } from "@/constants/strings";
import AppTitle from "@/shared/typography/app_title";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

interface DoLaterTasksListProps {
  tasks: TaskProps[];
  doLaterOpen: boolean;
  taskPendingCount: number;
  setDoLaterOpen: Dispatch<SetStateAction<boolean>>;
  handleAction: Function;
  handleEdit: Function;
}

const DoLaterTasksList = ({
  doLaterOpen,
  tasks,
  handleAction,
  handleEdit,
  setDoLaterOpen,
  taskPendingCount,
}: DoLaterTasksListProps) => {
  return (
    <TasksWrapper>
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
      {!doLaterOpen ? (
        <TasksLayout isOpen={doLaterOpen}>
          {tasks?.map((task: TaskProps) =>
            task.status === TaskStatusType.PENDING ? (
              <div key={task?.id}>
                {!task.editable ? (
                  <Task
                    showPause={false}
                    task={task}
                    handleAction={(data: string) => handleAction(data, task)}
                    handleEdit={() => handleEdit(task)}
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
  );
};

export default DoLaterTasksList;
