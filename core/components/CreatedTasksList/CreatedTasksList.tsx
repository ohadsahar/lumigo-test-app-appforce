import { TaskStatusType } from "@/constants/task_status";
import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
import Task from "../Task/Task";
import TaskForm from "@/core/components/TaskForm/TaskForm";
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
            {task.status === TaskStatusType.CREATED && !task.editMode ? (
              <Task
                task={task}
                handleAction={(data: string) => handleAction(data, task)}
                handleEdit={() => handleEdit(task)}
              />
            ) : (
              task.status === TaskStatusType.CREATED &&
              task.editMode && <TaskForm {...task} />
            )}
          </div>
        ))}
      </TasksLayout>
    </TasksWrapper>
  );
};

export default CreatedTasksList;
