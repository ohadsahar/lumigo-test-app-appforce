import { AlertProps } from "models/Alert.model";
import { AnyAction } from "redux";
import { SET_ALERT, REMOVE_ALERT } from "../types/Alert";

const initialState: AlertProps[] = [];

export const alertReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert: AlertProps) => alert.id !== payload);
    default:
      return state;
  }
};
