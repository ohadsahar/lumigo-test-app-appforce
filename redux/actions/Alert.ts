import { HandleIdsService } from "@/services/IdsService.service";
import { REMOVE_ALERT, SET_ALERT } from "../types/Alert";

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = HandleIdsService.createUniqueId();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 1500);
};
