import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SentMessages = (props) => {
  return (
    <Fragment>
      <div class="meni">
        <Link to="/dashboard">
          <i class="fas fa-inbox"></i> <span>Inbox</span>
        </Link>
        <Link class="active-button" to="/sent">
          {" "}
          <i class="fas fa-paper-plane"></i> Sent
        </Link>
        <Link to="/newmessage">
          <i class="fas fa-plus"></i> <span> New message</span>
        </Link>
      </div>
    </Fragment>
  );
};

SentMessages.propTypes = {};

export default SentMessages;
