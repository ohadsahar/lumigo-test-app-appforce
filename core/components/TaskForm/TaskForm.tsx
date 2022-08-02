import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import AppInputField from "@/shared/InputField/input_field";
import ErrorText from "@/shared/typography/error_text";
import { Dispatch, SetStateAction } from "react";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { FormWrapper } from "./styled";

interface TaskFormProps {
  id?: string;
  taskName: string;
  status: TaskStatusType;
  handleEditClick: Function;
}

const TaskForm = (task: TaskFormProps) => {
  const { onSubmit, taskValue, onChangeTaskname, isError } =
    useSubmitForm(task);

  return (
    <FormWrapper
      onSubmit={(event) => {
        if (task.handleEditClick) {
          task.handleEditClick();
        }
        onSubmit(event);
      }}
    >
      <AppInputField
        isEditable={task?.taskName?.length > 0}
        onChange={(data: string) => onChangeTaskname(data)}
        onSubmit={onSubmit}
        value={taskValue}
        handleEditClick={task.handleEditClick}
      />
      {isError && <ErrorText text={Strings.ValidationRequiredField} />}
    </FormWrapper>
  );
};

export default TaskForm;
