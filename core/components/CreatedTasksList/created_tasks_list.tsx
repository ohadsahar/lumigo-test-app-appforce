import { TaskStatusType } from "@/constants/task_status";
import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
import Task from "../Task/Task";
import TaskForm from "@/core/components/TaskForm/task_form";
import { TasksWrapper, TasksLayout } from "../Tasks/styled";

const CreatedTasksList = ({ tasks, handleAction, onEdit }: any) => {
  return (
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
        ;
      </TasksLayout>
    </TasksWrapper>
  );
};

export default CreatedTasksList;
