import Actions from "@/shared/Actions/actions";
import React from "react";
import { CardTask, CardDetailsWrapper } from "./styled";

const Task = ({
  task,
  handleAction,
  handleEdit,
  showPause = true,
  showCheck = true,
}: any) => {
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
