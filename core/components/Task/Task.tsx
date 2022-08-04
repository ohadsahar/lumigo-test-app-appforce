import Actions from "@/shared/Actions/Actions";
import { TaskProps } from "models/TaskProps.model";
import React from "react";
import { CardTask, CardDetailsWrapper } from "./styled";

interface TaskViewProps {
  task: TaskProps;
  handleAction: (action: string) => void;
  setCurrentEdit: () => void;
  handleEdit: () => void;
  showPause?: boolean;
  showCheck?: boolean;
}
const Task = ({
  task,
  handleAction,
  handleEdit,
  setCurrentEdit,
  showPause = true,
  showCheck = true,
}: TaskViewProps) => {
  const handleEditStatus = () => {
    handleEdit();
    setCurrentEdit();
  };
  return (
    <CardTask data-testid="task-box">
      <CardDetailsWrapper onClick={handleEditStatus}>
        {task.taskName}
      </CardDetailsWrapper>
      <Actions
        handleAction={handleAction}
        showPause={showPause}
        showCheck={showCheck}
      />
    </CardTask>
  );
};

export default Task;
