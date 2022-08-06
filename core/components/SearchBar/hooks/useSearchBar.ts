import { search } from '@/redux/actions/Tasks';
import { RootState } from '@/redux/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSearchBar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.taskState.tasks);
  const countSearchedTasks = tasks?.length;

  const onChange = useCallback((value: string) => {
    dispatch(search(value) as any);
  }, []);

  return { countSearchedTasks, onChange };
};
