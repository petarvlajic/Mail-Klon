import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  SEND_MESSAGE,
} from "../actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: {
    user: {
      messages: [],
      sentmessages: [],
    },
  },
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            sentmessages:[payload,...state.user.user.sentmessages]
          }
        }
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
    case DELETE_ACCOUNT:
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
