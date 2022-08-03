import { REMOVE_ALERT, SET_ALERT } from "../types/alert.types";

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = (Math.floor(Math.random() * 100) + Date.now()).toString();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 1500);
};
