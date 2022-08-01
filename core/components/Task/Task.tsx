import Actions from "@/shared/Actions/actions";
import { TaskProps } from "interfaces/task_props.interface";
import React from "react";
import { CardTask, CardDetailsWrapper } from "./styled";

interface TaskViewProps {
  task: TaskProps;
  handleAction: Function;
  handleEdit: Function;
  showPause?: boolean;
  showCheck?: boolean;
}
const Task = ({
  task,
  handleAction,
  handleEdit,
  showPause = true,
  showCheck = true,
}: TaskViewProps) => {
  return (
    <CardTask>
      <CardDetailsWrapper onClick={() => handleEdit()}>
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
