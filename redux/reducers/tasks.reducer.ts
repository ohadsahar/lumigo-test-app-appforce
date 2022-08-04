import { RESET_PROGRESS, SEARCH, SET_TASK } from "@/redux/types/tasks.types";
import { TaskProps } from "interfaces/task_props.interface";
import { AnyAction } from "redux";

interface StoreInitialStateProps {
  tasks: TaskProps[];
  loading: boolean;
  searchable: boolean;
  lastSearchedWord: string;
}
const initialState: StoreInitialStateProps = {
  tasks: [],
  loading: true,
  searchable: false,
  lastSearchedWord: "",
};

export const tasksReducer = (state = initialState, action: AnyAction) => {
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
