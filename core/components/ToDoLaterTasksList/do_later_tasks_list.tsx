import { TaskStatusType } from "@/constants/task_status";

import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
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

const DoLaterTasksList = ({
  doLaterOpen,
  tasks,
  handleAction,
  onEdit,
  setDoLaterOpen,
  taskPendingCount,
}: any) => {
  return (
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

export default DoLaterTasksList;
