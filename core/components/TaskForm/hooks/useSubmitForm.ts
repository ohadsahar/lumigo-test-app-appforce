import { createTask, editTask } from "@/redux/actions/Tasks";
import { useAppDispatch } from "@/redux/store";
import { TaskFormProps } from "models/task_form_props.interface";
import { TaskProps } from "models/task_props.interface";
import { useCallback, useState } from "react";

type SubmitTaskAction = {
  event: React.SyntheticEvent;
  handleEditClick: () => void;
};

export const useSubmitForm = ({ id, taskName, status }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const [isError, setError] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(taskName ?? "");

  const onChangeTaskname = useCallback(
    (data: string) => {
      setTaskValue(data);
      if (!taskValue && isError) {
        setError(false);
      }
    },
    [taskValue, isError]
  );

  const onSubmit = (event?: any) => {
    event?.preventDefault();
    setTaskValue(taskValue.trim());
    if (taskName && taskValue) {
      handleEditTask();
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

  const handleEditTask = () => {
    const task: TaskProps = {
      id: id ?? "",
      taskName: taskValue.trim(),
      status,
    };
    dispatch(editTask(task) as any);
  };

  const handlePressedEnter = ({ handleEditClick, event }: SubmitTaskAction) => {
    if (handleEditClick) {
      handleEditClick();
    }
    onSubmit(event);
  };

  return { onSubmit, taskValue, onChangeTaskname, isError, handlePressedEnter };
};
