import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sendMessage } from "../../actions/messages";

const NewMessage = ({ sendMessage }) => {
  const [sendMessageForm, setSentMessageForm] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const onInputChange = (e) => {
    setSentMessageForm({ ...sendMessageForm, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(sendMessageForm);
  };

  return (
    <div>
      <div class="meni">
        <Link to="/dashboard">
          <i class="fas fa-inbox"></i> <span>Inbox</span>
        </Link>
        <Link to="/sent">
          {" "}
          <i class="fas fa-paper-plane"></i> Sent
        </Link>
        <Link class="active-button" to="/newmessage">
          <i class="fas fa-plus"></i> <span> New message</span>
        </Link>
      </div>
      <form onSubmit={onFormSubmit}>
        <table class="messages-box">
          <tr>
            <td>
              <label>To:</label>
            </td>
            <td>
              <input
                required
                type="email"
                class="messages-input"
                name="email"
                value={sendMessageForm.email}
                onChange={onInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Subject:</label>
            </td>
            <td>
              <input
                required
                type="text"
                class="messages-input"
                name="subject"
                value={sendMessageForm.subject}
                onChange={onInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label> Body:</label>
            </td>
            <td>
              <input
                required
                class="taPoruka"
                name="body"
                value={sendMessageForm.body}
                onChange={onInputChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button>Send</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

NewMessage.propTypes = {};

export default connect(null, { sendMessage })(NewMessage);
