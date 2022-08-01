import { TaskStatusType } from "@/constants/task_status";
import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
import Task from "../Task/Task";
import TaskForm from "@/core/components/TaskForm/task_form";
import { TasksWrapper, TasksLayout } from "../Tasks/styled";

interface CreatedTasksListProps {
  tasks: TaskProps[];
  handleAction: Function;
  handleEdit: Function;
}

const CreatedTasksList = ({
  tasks,
  handleAction,
  handleEdit,
}: CreatedTasksListProps) => {
  return (
    <TasksWrapper>
      <TasksLayout>
        {tasks?.map((task: TaskProps) => (
          <div key={task.id}>
            {task.status === TaskStatusType.CREATED ? (
              !task?.editable ? (
                <Task
                  task={task}
                  handleAction={(data: string) => handleAction(data, task)}
                  handleEdit={() => handleEdit(task)}
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
