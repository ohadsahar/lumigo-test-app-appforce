import { LocalStorageKeys } from '@/constants/LocalStorageKeys';
import { Strings } from '@/constants/Strings';
import { TaskStatusType } from '@/constants/TaskStatus';
import store from '@/redux/store';
import { RESET_PROGRESS, SEARCH, SET_TASK } from '@/redux/types/Tasks';
import { TaskProps } from 'models/TaskProps.model';
import { LocalStorageService } from '@/services/LocalStorage.service';
import { setAlert } from './Alert';
import axios from 'axios';
import { ApiUrl } from '@/constants/Config';
import { CreateTaskProps } from 'models/CreateTaskProps.model';

export const loadTasks = () => async (dispatch: any) => {
  dispatch(resetDataFromLocalStorage(SET_TASK));
  const response = await axios.get(
    'https://ztri4rkjg9.execute-api.us-east-1.amazonaws.com/dev/task-app/all',
    {
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }
  );
  console.log(response);
};

export const createTask = (taskName: string) => async (dispatch: any) => {
  const currentTasks = store.getState().taskState.tasks;
  const taskToCreate: CreateTaskProps = {
    taskName,
    status: TaskStatusType.CREATED,
  };
  const { data } = await axios.post(ApiUrl, taskToCreate);
  if (data) {
    const newTask: TaskProps = data;
    const newTasks = [...currentTasks, newTask];
    setLocalStorageData(newTasks);
    dispatch({
      type: SET_TASK,
      payload: newTasks,
    });

    dispatch(setAlert(Strings.AlertSuccessCreatedTask, Strings.Success));
  }
};

export const editTask = (task: TaskProps) => (dispatch: any) => {
  const { currentTaskDB } = handleDB();
  const isSearching = store.getState().taskState.searchable;
  const indexToUpdate = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );

  if (indexToUpdate >= 0) {
    currentTaskDB[indexToUpdate] = task;
    setLocalStorageData(currentTaskDB);
    dispatch({ type: SET_TASK, payload: currentTaskDB });
    if (isSearching) {
      const searchedWord = store.getState().taskState.lastSearchedWord;
      dispatch(search(searchedWord));
    }
  } else {
    dispatch(setAlert(Strings.AlertFailedUpdateTask, Strings.Error));
  }
};

export const stopTask = (task: TaskProps) => (dispatch: any) => {
  const tasks = store.getState().taskState.tasks;
  const { currentTaskDB } = handleDB();
  const taskIndex = tasks.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  const dbIndex = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  if (dbIndex >= 0) {
    currentTaskDB[dbIndex].status = TaskStatusType.PENDING;
  }
  if (taskIndex >= 0) {
    tasks[taskIndex].status = TaskStatusType.PENDING;
    setLocalStorageData(currentTaskDB);
    dispatch(updateLists(SET_TASK, tasks));
    dispatch(setAlert(Strings.AlertSuccessTaskMovedToDoLater, Strings.Success));
  } else {
    dispatch(setAlert(Strings.AlertFailedPauseTask, Strings.Error));
  }
};

export const finishTask = (task: TaskProps) => (dispatch: any) => {
  const { currentTaskDB } = handleDB();
  const tasks = store.getState().taskState.tasks;
  const taskIndex = tasks.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  const dbIndex = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  if (dbIndex >= 0) {
    currentTaskDB[dbIndex].status = TaskStatusType.COMPLETED;
  }
  if (taskIndex >= 0) {
    tasks[taskIndex].status = TaskStatusType.COMPLETED;
    setLocalStorageData(currentTaskDB);
    dispatch(updateLists(SET_TASK, tasks));
    dispatch(setAlert(Strings.AlertSuccessFinishTask, Strings.Success));
  } else {
    dispatch(setAlert(Strings.AlertFailedCompleteTask, Strings.Error));
  }
};

export const deleteTask = (task: TaskProps) => async (dispatch: any) => {
  const { currentTaskDB } = handleDB();
  const isSearching = store.getState().taskState.searchable;
  const taskIndex = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  const idToDelete = currentTaskDB[taskIndex].id;
  if (taskIndex >= 0) {
    currentTaskDB.splice(taskIndex, 1);
    setLocalStorageData(currentTaskDB);
    dispatch(updateLists(SET_TASK, currentTaskDB));
    if (isSearching) {
      const searchedWord = store.getState().taskState.lastSearchedWord;
      dispatch(search(searchedWord));
    }
    await axios.delete(ApiUrl, {
      data: { id: idToDelete },
    });
    dispatch(setAlert(Strings.AlertSucessRemovedTask, Strings.Success));
  } else {
    dispatch(setAlert(Strings.AlertFailedRemovedTask, Strings.Error));
  }
};

export const search = (searchValue: string) => (dispatch: any) => {
  if (searchValue.length > 0) {
    const tasks = store.getState().taskState.tasks;
    const currentTasks = tasks.filter((task: TaskProps) =>
      task.taskName.toLowerCase().includes(searchValue.toLowerCase())
    );
    dispatch({
      type: SEARCH,
      payload: {
        tasks: currentTasks,
        lastSearchedWord: searchValue,
        searchable: searchValue.length > 0,
      },
    });
  } else {
    dispatch(resetDataFromLocalStorage(SEARCH));
  }
};

export const resetProgress = () => (dispatch: any) => {
  setLocalStorageData([]);
  dispatch({
    type: RESET_PROGRESS,
    payload: {
      tasks: [],
      loading: true,
      searchable: false,
      lastSearchedWord: '',
    },
  });
  dispatch(setAlert(Strings.AlertSuccessResetTasks, Strings.Success));
};

const updateLists = (type: string, tasks: TaskProps[]) => (dispatch: any) => {
  dispatch({
    type,
    payload: tasks,
  });
};

const handleDB = () => {
  const currentTasks = LocalStorageService.getNameByKey(LocalStorageKeys.Tasks);
  let currentTaskDB: TaskProps[] = [];
  if (currentTasks) {
    currentTaskDB = (currentTasks as TaskProps[]) ?? [];
  }
  return { currentTaskDB };
};

const resetDataFromLocalStorage = (type: string) => (dispatch: any) => {
  const tasks = LocalStorageService.getNameByKey(LocalStorageKeys.Tasks);
  if (tasks) {
    if (type === SEARCH) {
      dispatch({
        type: SEARCH,
        payload: {
          tasks,
        },
      });
    } else {
      dispatch({
        type,
        payload: tasks ?? [],
      });
    }
  }
};

const setLocalStorageData = (tasks: TaskProps[]) => {
  LocalStorageService.setByKeyName(LocalStorageKeys.Tasks, tasks);
};
