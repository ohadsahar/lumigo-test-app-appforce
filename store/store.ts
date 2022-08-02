import { useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducer } from "./reducers/alertReducer";
import { tasksReducer } from "./reducers/tasks.reducer";

const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
  taskState: tasksReducer,
  alertState: alertReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
