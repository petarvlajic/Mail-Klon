import axios from "axios";
import { Redirect } from "react-router-dom";
import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT,
  PROFILE_ERROR,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get("/test", config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register user

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/test", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

//Login user

export const login = (email, password) => async (dispatch) => {
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/test/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch({ type: USER_LOADED });
    dispatch(setAlert("Login Succesful", "success"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch(setAlert("Invalid Credentials", "danger"));

    dispatch({ type: LOGIN_FAIL });
  }
};

// Delete account

export const deleteAccount = () => async (dispatch) => {
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete(`/test`, config);

      dispatch({
        type: DELETE_ACCOUNT,
      });

      window.location.reload(false);
      window.location.replace("/");
      dispatch(setAlert("Your account has been permanently deleted", "danger"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
