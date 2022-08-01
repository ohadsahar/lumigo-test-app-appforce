import { SET_ALERT, REMOVE_ALERT } from "../types/alert.types";
import { v4 as uuid } from "uuid";
import { AppDispatch } from "../store";

export const setAlert =
  (msg: string, alertType: string) => (dispatch: AppDispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 1500);
  };
