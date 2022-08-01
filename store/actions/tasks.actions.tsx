import store from "@/store/store";
import { TaskProps } from "interfaces/task_props.interface";
import { v4 as uuid } from "uuid";
import { RESET_PROGRESS, SEARCH, SET_TASK } from "@/store/types/tasks.types";
import { setAlert } from "./alert.actions";
import { Strings } from "@/constants/strings";
import { LocalStorageKeys } from "@/constants/local_storage_keys";
import { TaskStatusType } from "@/constants/task_status";

export const loadTasks = () => (dispatch: any) => {
  dispatch(resetDataFromLocalStorage(SET_TASK));
};

export const createTask = (taskName: string) => (dispatch: any) => {
  const id = uuid();
  const currentTasks = store.getState().taskState.tasks;
  const newTask: TaskProps = {
    id,
    taskName,
    status: TaskStatusType.CREATED,
    editable: false,
  };
  const newTasks = [...currentTasks, newTask];
  setLocalStorageData(newTasks);
  dispatch({
    type: SET_TASK,
    payload: newTasks,
  });
  dispatch(setAlert(Strings.AlertSuccessCreatedTask, Strings.Success));
};

export const editTask = (task: TaskProps) => (dispatch: any) => {
  const { currentTaskDB } = handleDB();
  const isSearching = store.getState().taskState.searchable;
  if (!task.editable) {
    dispatch(setAlert(Strings.AlertSuccessEditTask, Strings.Success));
  }
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
  let taskIndex = tasks.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  let dbIndex = currentTaskDB.findIndex(
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
  let taskIndex = tasks.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  let dbIndex = currentTaskDB.findIndex(
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

export const deleteTask = (task: TaskProps) => (dispatch: any) => {
  const { currentTaskDB } = handleDB();
  const isSearching = store.getState().taskState.searchable;
  let taskIndex = currentTaskDB.findIndex(
    (currentTask: TaskProps) => currentTask.id === task.id
  );
  if (taskIndex >= 0) {
    currentTaskDB.splice(taskIndex, 1);
    setLocalStorageData(currentTaskDB);
    dispatch(updateLists(SET_TASK, currentTaskDB));
    if (isSearching) {
      const searchedWord = store.getState().taskState.lastSearchedWord;
      dispatch(search(searchedWord));
    }
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
        searchable: searchValue.length > 0 ? true : false,
        editable: true,
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
      lastSearchedWord: "",
    },
  });
  dispatch(setAlert(Strings.AlertSuccessResetTasks, Strings.Success));
};

const updateLists = (type: string, tasks: TaskProps[]) => (dispatch: any) => {
  dispatch({
    type: type,
    payload: tasks,
  });
};

const handleDB = () => {
  const currentTasks = localStorage.getItem(LocalStorageKeys.Tasks);
  let currentTaskDB: TaskProps[] = [];
  if (currentTasks) {
    currentTaskDB = (JSON.parse(currentTasks) as TaskProps[]) ?? [];
  }
  return { currentTaskDB };
};

const resetDataFromLocalStorage = (type: string) => (dispatch: any) => {
  let tasks = localStorage.getItem(LocalStorageKeys.Tasks);
  if (tasks) {
    tasks = JSON.parse(tasks);
  }
  if (type === SEARCH) {
    dispatch({
      type: SEARCH,
      payload: {
        tasks: tasks,
      },
    });
  } else {
    dispatch({
      type: type,
      payload: tasks ?? [],
    });
  }
};

const setLocalStorageData = (tasks: TaskProps[]) => {
  localStorage.setItem(LocalStorageKeys.Tasks, JSON.stringify(tasks));
};
