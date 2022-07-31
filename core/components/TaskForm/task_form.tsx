import { Strings } from "@/constants/strings";
import AppInputField from "@/shared/InputField/input_field";
import ErrorText from "@/shared/typography/error_text";
import { createTask, editTask } from "@/store/actions/tasks.actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormWrapper } from "./styled";

const TaskForm = ({ task }: any) => {
  const dispatch = useDispatch();
  const [isError, setError] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>("");

  useEffect(() => {
    if (task) {
      setTaskValue(task.taskName);
    }
  }, []);

  const onChangeTaskname = (data: string) => {
    setTaskValue(data);
    if (!taskValue && isError) {
      setError(false);
    }
  };

  const onSubmit = (event?: any) => {
    event?.preventDefault();
    if (event?.keyCode == 13) {
      event.preventDefault();
    }
    setTaskValue(taskValue.trim());
    if (task && taskValue) {
      task.editable = false;
      task.taskName = taskValue.trim();
      dispatch(editTask(task) as any);
    } else {
      if (!taskValue) {
        setError(true);
      } else {
        if (isError) {
          setError(false);
        }
        dispatch(createTask(taskValue) as any);
        setTaskValue("");
      }
    }
  };

  return (
    <FormWrapper onSubmit={() => onSubmit(event)}>
      <AppInputField
        isEditable={task?.taskName?.length > 0}
        onChange={(data: string) => onChangeTaskname(data)}
        onSubmit={() => onSubmit()}
        value={taskValue}
      />
      {isError ? <ErrorText text={Strings.ValidationRequiredField} /> : null}
    </FormWrapper>
  );
};

export default TaskForm;
