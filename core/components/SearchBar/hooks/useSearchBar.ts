import { search } from "@/store/actions/tasks.actions";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export const useSearchBar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.taskState.tasks);
  const countSearchedTasks = tasks?.length;

  const onChange = (value: string) => {
    dispatch(search(value) as any);
  };

  return { countSearchedTasks, onChange };
};
