import axios from "axios";
import { SET_HELLO, FETCH_TODOS, FETCHING_TODOS, REJECT_TODOS } from "./types";

export const setHello = payload => ({
  type: SET_HELLO,
  payload
});

export const fetchTodos = () => async dispatch => {
  dispatch({
    type: FETCHING_TODOS,
    payload: { isLoading: true }
  });

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setTimeout(() => {
      if (!Array.isArray(response.data)) {
        return dispatch({
          type: REJECT_TODOS,
          payload: { isLoading: false, error: "Data Error" }
        });
      }
      return dispatch({
        type: FETCH_TODOS,
        payload: { isLoading: false, data: response.data }
      });
    }, 2000);
  } catch (e) {
    return dispatch({
      type: REJECT_TODOS,
      payload: { isLoading: false, error: "Response Error" }
    });
  }
};
