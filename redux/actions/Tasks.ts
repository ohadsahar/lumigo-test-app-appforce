import { ApiUrl } from '@/constants/Config';
import { LocalStorageKeys } from '@/constants/LocalStorageKeys';
import { Strings } from '@/constants/Strings';
import { TaskStatusType } from '@/constants/TaskStatus';
import store from '@/redux/store';
import { RESET_PROGRESS, SEARCH, SET_TASK } from '@/redux/types/Tasks';
import { LocalStorageService } from '@/services/LocalStorage.service';
import axios from 'axios';
import { CreateTaskProps } from 'models/CreateTaskProps.model';
import { TaskProps } from 'models/TaskProps.model';
import { setAlert } from './Alert';

let tokens;
let accessToken = '';
let headers: any;

if (typeof localStorage !== 'undefined') {
  tokens = LocalStorageService.getNameByKey(LocalStorageKeys.TOKENS);
  accessToken = tokens.idToken.jwtToken;
  headers = {
    Authorization: accessToken,
  };
}

export const loadTasks = () => async (dispatch: any) => {
  const tokens = LocalStorageService.getNameByKey(LocalStorageKeys.TOKENS);
  if (tokens) {
    const { data } = await axios.get(`${ApiUrl}/all`, { headers });
    if (data) {
      dispatch({
        type: SET_TASK,
        payload: data ?? [],
      });
    }
  }
};

export const createTask = (taskName: string) => async (dispatch: any) => {
  const currentTasks = store.getState().taskState.tasks;

  const taskToCreate: CreateTaskProps = {
    taskName,
    status: TaskStatusType.CREATED,
  };
  const { data } = await axios.post(ApiUrl, taskToCreate, { headers });
  if (data) {
    const newTask: TaskProps = data;
    const newTasks = [...currentTasks, newTask];
    dispatch({
      type: SET_TASK,
      payload: newTasks,
    });
    dispatch(setAlert(Strings.AlertSuccessCreatedTask, Strings.Success));
  }
};

export const editTask = (task: TaskProps) => async (dispatch: any) => {
  const currentTaskDB = store.getState().taskState.tasks;
  const isSearching = store.getState().taskState.searchable;

  const indexToUpdate = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );

  if (indexToUpdate >= 0) {
    currentTaskDB[indexToUpdate] = task;
    const result = await axios.put(ApiUrl, currentTaskDB[indexToUpdate], {
      headers,
    });
    if (result) {
      dispatch({ type: SET_TASK, payload: currentTaskDB });
      if (isSearching) {
        const searchedWord = store.getState().taskState.lastSearchedWord;
        dispatch(search(searchedWord));
      }
    }
  } else {
    dispatch(setAlert(Strings.AlertFailedUpdateTask, Strings.Error));
  }
};

export const stopTask = (task: TaskProps) => async (dispatch: any) => {
  const tasks = store.getState().taskState.tasks;
  const currentTaskDB = store.getState().taskState.tasks;
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
    dispatch(updateLists(SET_TASK, tasks));
    dispatch(setAlert(Strings.AlertSuccessTaskMovedToDoLater, Strings.Success));
    await axios.put(ApiUrl, tasks[taskIndex], { headers });
  } else {
    dispatch(setAlert(Strings.AlertFailedPauseTask, Strings.Error));
  }
};

export const finishTask = (task: TaskProps) => async (dispatch: any) => {
  const currentTaskDB = store.getState().taskState.tasks;
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
    dispatch(updateLists(SET_TASK, tasks));
    dispatch(setAlert(Strings.AlertSuccessFinishTask, Strings.Success));
    await axios.put(ApiUrl, tasks[taskIndex], { headers });
  } else {
    dispatch(setAlert(Strings.AlertFailedCompleteTask, Strings.Error));
  }
};

export const deleteTask = (task: TaskProps) => async (dispatch: any) => {
  const currentTaskDB = store.getState().taskState.tasks;
  const isSearching = store.getState().taskState.searchable;
  const taskIndex = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  const idToDelete = currentTaskDB[taskIndex].id;
  if (taskIndex >= 0) {
    currentTaskDB.splice(taskIndex, 1);
    dispatch(updateLists(SET_TASK, currentTaskDB));
    if (isSearching) {
      const searchedWord = store.getState().taskState.lastSearchedWord;
      dispatch(search(searchedWord));
    }

    await axios.delete(ApiUrl, { data: { id: idToDelete }, headers });
    dispatch(setAlert(Strings.AlertSucessRemovedTask, Strings.Success));
  } else {
    dispatch(setAlert(Strings.AlertFailedRemovedTask, Strings.Error));
  }
};

export const search = (searchValue: string) => (dispatch: any) => {
  if (searchValue.length > 0) {
    const tasks = store.getState().taskState.tasks;
    const currentTasks = tasks?.filter((task: TaskProps) =>
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
    dispatch(fetchDataFromDB(SEARCH));
  }
};

export const resetProgress = () => async (dispatch: any) => {
  dispatch({
    type: RESET_PROGRESS,
    payload: {
      tasks: [],
      loading: true,
      searchable: false,
      lastSearchedWord: '',
    },
  });
  await axios.delete(ApiUrl, {
    data: { type: 'all' },
    headers: { headers },
  });
  dispatch(setAlert(Strings.AlertSuccessResetTasks, Strings.Success));
};

const updateLists = (type: string, tasks: TaskProps[]) => (dispatch: any) => {
  dispatch({
    type,
    payload: tasks,
  });
};

const fetchDataFromDB = (type: string) => async (dispatch: any) => {
  const { data } = await axios.get(`${ApiUrl}/all`);
  const tasks: TaskProps[] = data;
  if (data) {
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
        payload: data ?? [],
      });
    }
  }
};
