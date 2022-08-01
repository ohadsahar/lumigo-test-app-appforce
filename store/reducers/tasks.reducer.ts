import { RESET_PROGRESS, SEARCH, SET_TASK } from "@/store/types/tasks.types";

const initialState: any = {
  tasks: [],
  loading: true,
  searchable: false,
  lastSearchedWord: "",
};

export const tasksReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TASK:
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
        editMode: payload.editMode,
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
