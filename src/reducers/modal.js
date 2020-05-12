import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal";

/*
This reducer keeps state of the application modal state
 */
export default function modalReducer(
  state = { open: false, body: null },
  action
) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        body: action.content,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        body: null,
      };
    default:
      return state;
  }
}
