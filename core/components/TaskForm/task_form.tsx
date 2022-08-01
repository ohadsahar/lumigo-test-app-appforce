import { Strings } from "@/constants/strings";
import { TaskStatusType } from "@/constants/task_status";
import AppInputField from "@/shared/InputField/input_field";
import ErrorText from "@/shared/typography/error_text";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { FormWrapper } from "./styled";

interface TaskFormProps {
  task: {
    id?: string;
    taskName: string;
    status: TaskStatusType;
    editable: boolean;
  };
}

const TaskForm = ({ task }: TaskFormProps) => {
  const { onSubmit, taskValue, onChangeTaskname, isError } =
    useSubmitForm(task);

  return (
    <FormWrapper onSubmit={(event) => onSubmit(event)}>
      <AppInputField
        isEditable={task?.taskName?.length > 0}
        onChange={(data: string) => onChangeTaskname(data)}
        onSubmit={onSubmit}
        value={taskValue}
      />
      {isError ? <ErrorText text={Strings.ValidationRequiredField} /> : null}
    </FormWrapper>
  );
};

export default TaskForm;
