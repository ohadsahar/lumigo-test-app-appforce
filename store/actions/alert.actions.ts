import { SET_ALERT, REMOVE_ALERT } from "../types/alert.types";
import { v4 as uuid } from "uuid";

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 1500);
};
