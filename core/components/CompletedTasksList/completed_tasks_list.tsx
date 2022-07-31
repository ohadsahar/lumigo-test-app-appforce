import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import AppTitle from "@/shared/typography/app_title";

import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/task_form";
import {
  TaskTitleWrapper,
  DownArrowWrapper,
  TasksWrapper,
  TasksLayout,
} from "../Tasks/styled";

const CompletedTasksList = ({
  tasks,
  handleAction,
  onEdit,
  setCompletedOpen,
  taskCompletedCount,
  completedOpen,
}: any) => {
  return (
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
                      handleAction={(data: string) => handleAction(data, task)}
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
  );
};

export default CompletedTasksList;
