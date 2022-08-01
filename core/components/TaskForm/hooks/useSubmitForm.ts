import { createTask, editTask } from "@/store/actions/tasks.actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useSubmitForm = (task: any) => {
  const dispatch = useDispatch();
  const [isError, setError] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(task?.taskName ?? "");

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
      dispatch(
        editTask({
          ...task,
          editable: false,
          taskName: taskValue.trim(),
        }) as any
      );
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

  return { onSubmit, taskValue, onChangeTaskname, isError };
};
