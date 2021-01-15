import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

import {
  GET_MESSAGES,
  MESSAGES_ERROR,
  SEND_MESSAGE,
  MESSAGE_DELETED,
} from "./types";

//GET MESSAGES FROM USER

export const getMessages = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/messages", config);

    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: MESSAGES_ERROR });
  }
};
// let data = {
//   text: form,
// };
// data = JSON.stringify(data);
export const sendMessage = (message) => async (dispatch) => {
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let body = {
    email: message.email,
    subject: message.subject,
    body: message.body,
  };
  body = JSON.stringify(body);

  let payloadMessage = {
    to: message.email,
    subject: message.subject,
    body: message.body,
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/messages",
      body,
      config
    );
    dispatch({
      type: SEND_MESSAGE,
      payload: payloadMessage,
    });
    window.location.reload(false);
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};

//Delete message

export const deleteMessage = (id) => async (dispatch) => {
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.delete(`/messages/delete/${id}`, config);

    dispatch({
      type: MESSAGE_DELETED,
      payload: res.data,
    });

    window.location.reload(false);
    dispatch(loadUser());

    dispatch(setAlert("Message Removed", "success"));
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete message

export const deleteSentMessage = (id) => async (dispatch) => {
  console.log("eeee");
  const x = document.cookie;
  const cookie = x.split("=");
  const token = cookie[1];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.delete(`/messages/sentmessages/${id}`, config);

    dispatch({
      type: MESSAGE_DELETED,
      payload: res.data,
    });

    window.location.reload(false);
    dispatch(setAlert("Message Removed", "success"));
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
