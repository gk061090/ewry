import { FETCHING_TODOS, FETCH_TODOS, REJECT_TODOS } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TODOS:
    case FETCH_TODOS:
    case REJECT_TODOS:
      return action.payload;
    default:
      return state;
  }
};
