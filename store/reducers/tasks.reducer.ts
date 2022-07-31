import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  STOP_TASK,
  FINISH_TASK,
  RESET_PROGRESS,
  LOAD_TASKS,
  SEARCH,
} from "@/store/types/tasks.types";

const initialState: any = {
  tasks: [],
  loading: true,
  searchable: false,
  lastSearchedWord: "",
};

export const tasksReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case STOP_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case FINISH_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };

    case SEARCH:
      return {
        ...state,
        tasks: payload.tasks,
        loading: false,
        editable: payload.editable,
        searchable: payload.searchable,
        lastSearchedWord: payload.lastSearchedWord,
      };

    case RESET_PROGRESS:
      return {
        ...state,
        tasks: [],
        loading: false,
        searchable: false,
        lastSearchedWord: "",
      };
    default:
      return state;
  }
};
