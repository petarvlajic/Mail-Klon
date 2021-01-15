import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteMessage, deleteSentMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import Spinner from "./Spinner";

const SingleMessage = ({
  id,
  from,
  subject,
  body,
  created,
  role,
  deleteMessage,
  deleteSentMessage,
}) => {
  let time1 = created.split("T");
  const time2 = time1[1].split(".");

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (role === "message") {
    return (
      <div className="message">
        <table>
          <tr>
            <td className="td-info">
              <b>
                <i class="fas fa-address-card"></i>From:
              </b>
            </td>
            <td>{from}</td>
          </tr>

          <tr>
            <td className="td-info">
              <i class="fas fa-envelope"></i>
              <b>Subject:</b>
            </td>
            <td>[{subject}]</td>
          </tr>

          <tr>
            <td className="td-info">
              {" "}
              <b>Body:</b>
            </td>
            <td className="td-information">{body}</td>

            <td>
              <button
                className="deletebtn btn-primary"
                onClick={() => deleteMessage(id)}
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="td-info">
              <b>Time:</b>
            </td>

            <td>
              {time2[0]}
              <br></br>
              {time1[0]}
            </td>
          </tr>
        </table>
      </div>
    );
  } else {
    return (
      <div className="message">
        <table>
          <tr>
            <td className="td-info">
              <span>
                <b>
                  <i class="far fa-address-card"></i>To:
                </b>
              </span>
            </td>
            <td>{from}</td>
          </tr>

          <tr>
            <td className="td-info">
              <span>
                <i class="far fa-envelope"></i>
                <b>Subject:</b>
              </span>
            </td>
            <td>[{subject}]</td>
          </tr>

          <tr>
            <td className="td-info">
              {" "}
              <b>Body:</b>
            </td>
            <td className="td-information">{body}</td>
            <td>
              <button
                className="deletebtn btn-primary"
                onClick={() => deleteSentMessage(id)}
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="td-info">
              <b>Time:</b>
            </td>
            <td>
              {time2[0]}
              <br></br>
              {time1[0]}
            </td>
          </tr>
        </table>
      </div>
    );
  }
};

SingleMessage.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  deleteSentMessage: PropTypes.func.isRequired,
};

export default connect(null, { deleteMessage, deleteSentMessage })(
  SingleMessage
);
