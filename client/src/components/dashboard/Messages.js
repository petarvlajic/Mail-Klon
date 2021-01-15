import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SingleMessage from "../layout/SingleMessage";
import NewMessage from "./NewMessage";
import { sendMessage } from "../../actions/messages";

const Messages = ({ loading, messages, sentMessages, sendMessage }) => {
  const [displayedMessages, setDisplayedMessages] = useState("messages");

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
    setSentMessageForm({
      email: "",
      subject: "",
      body: "",
    });
  };

  const onMessagesClick = (e) => {
    setDisplayedMessages("messages");
  };

  const onSentMessagesClick = (e) => {
    setDisplayedMessages("sentMessages");
  };

  const sendMessageD = (e) => {
    setDisplayedMessages("sendMessage");
  };

  const displaySendMessage = () => {
    return (
      <div>
        <div class="meni">
          <a onClick={onMessagesClick}>
            <i class="fas fa-inbox"></i> <span>Inbox</span>
          </a>
          <a onClick={onSentMessagesClick}>
            {" "}
            <i class="fas fa-paper-plane"></i> Sent
          </a>
          <a class="active-button" onClick={sendMessageD}>
            <i class="fas fa-plus"></i> <span> New message</span>
          </a>
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
                  class="messages-input top-input"
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
                  class="messages-input "
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
                  class="messagebody-input"
                  name="body"
                  value={sendMessageForm.body}
                  onChange={onInputChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="newmessage-button">Send</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  };

  const displayAllMessages = () => {
    return messages.map((message) => {
      return (
        <div key={message._id}>
          <SingleMessage
            id={message._id}
            from={message.from}
            subject={message.subject}
            body={message.body}
            created={message.createdAt}
            role="message"
          />
        </div>
      );
    });
  };

  const displayAllSentMessages = () => {
    return sentMessages.map((message) => {
      return (
        <div key={message._id}>
          <SingleMessage
            id={message._id}
            from={message.to}
            subject={message.subject}
            body={message.body}
            created={message.createdAt}
            role="sent"
          />
        </div>
      );
    });
  };

  if (displayedMessages === "messages") {
    return (
      <Fragment>
        {" "}
        <div class="meni">
          <a class="active-button" onClick={onMessagesClick}>
            <i class="fas fa-inbox"></i> <span>Inbox</span>
          </a>{" "}
          <a onClick={onSentMessagesClick}>
            <i class="fas fa-paper-plane"></i> Sent
          </a>
          <a onClick={sendMessageD}>
            <i class="fas fa-plus"></i> <span> New message</span>
          </a>
        </div>
        {displayAllMessages()}
      </Fragment>
    );
  } else if (displayedMessages === "sentMessages") {
    return (
      <Fragment>
        {" "}
        <div class="meni">
          <a onClick={onMessagesClick}>
            <i class="fas fa-inbox"></i> <span>Inbox</span>
          </a>{" "}
          <a class="active-button" onClick={onSentMessagesClick}>
            <i class="fas fa-paper-plane"></i> Sent
          </a>
          <a onClick={sendMessageD}>
            <i class="fas fa-plus"></i> <span> New message</span>
          </a>
        </div>
        {displayAllSentMessages()}
      </Fragment>
    );
  } else if (displayedMessages === "sendMessage") {
    return <div>{displaySendMessage()}</div>;
  }
};

Messages.propTypes = {};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  messages: state.auth.user.user.messages,
  sentMessages: state.auth.user.user.sentmessages,
});

export default connect(mapStateToProps, { sendMessage })(Messages);
