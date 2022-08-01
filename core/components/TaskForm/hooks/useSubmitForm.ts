import { createTask, editTask } from "@/store/actions/tasks.actions";
import { Dispatcher } from "@/store/store";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useSubmitForm = (task: any) => {
  const dispatch: Dispatcher = useDispatch();
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

  const onSubmit = useCallback((event?: any) => {
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
        dispatch(createTask(taskValue));
        setTaskValue("");
      }
    }
  }, []);

  const handleEditTask = useCallback(() => {
    dispatch(
      editTask({
        ...task,
        editMode: false,
        taskName: taskValue.trim(),
      })
    );
  }, []);

  return { onSubmit, taskValue, onChangeTaskname, isError };
};
