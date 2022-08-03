import { createTask, editTask } from "@/store/actions/tasks.actions";
import { useAppDispatch } from "@/store/store";
import { TaskFormProps } from "interfaces/task_form_props.interface";
import { TaskProps } from "interfaces/task_props.interface";
import { useCallback, useState } from "react";

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

  const handlePressedEnter = (event: any, handleEditClick: Function) => {
    if (handleEditClick) {
      handleEditClick();
    }
    onSubmit(event);
  };

  return { onSubmit, taskValue, onChangeTaskname, isError, handlePressedEnter };
};
