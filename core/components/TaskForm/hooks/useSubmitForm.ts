import { createTask, editTask } from "@/store/actions/tasks.actions";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useSubmitForm = (task: any) => {
  const dispatch = useDispatch();
  const [isError, setError] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(task?.taskName ?? "");

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
    if (task.taskName && taskValue) {
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
    dispatch(
      editTask({
        ...task,
        editMode: false,
        taskName: taskValue.trim(),
      }) as any
    );
  };

  return { onSubmit, taskValue, onChangeTaskname, isError };
};
