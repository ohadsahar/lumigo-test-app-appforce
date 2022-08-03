import { Strings } from "@/constants/strings";
import AppInputField from "@/shared/InputField/input_field";
import ErrorText from "@/shared/typography/error_text";
import { TaskFormProps } from "interfaces/task_form_props.interface";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { FormWrapper } from "./styled";

const TaskForm = ({ id, taskName, status, handleEditClick }: TaskFormProps) => {
  const { onSubmit, taskValue, onChangeTaskname, isError, handlePressedEnter } =
    useSubmitForm({
      id,
      taskName,
      status,
      handleEditClick,
    });

  return (
    <FormWrapper
      onSubmit={(event: React.SyntheticEvent) => {
        handlePressedEnter(event, handleEditClick);
      }}
    >
      <AppInputField
        isEditable={taskName?.length > 0}
        onChange={(data: string) => onChangeTaskname(data)}
        onSubmit={onSubmit}
        value={taskValue}
        handleEditClick={handleEditClick}
      />
      {isError && <ErrorText text={Strings.ValidationRequiredField} />}
    </FormWrapper>
  );
};

export default TaskForm;
