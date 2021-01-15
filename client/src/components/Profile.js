import React, { Fragment, useEffect } from "react";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import avatar from "../img/avatar.png";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import { deleteAccount } from "../actions/auth";

const Profile = ({ auth: { user }, deleteAccount }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const time = user.user.createdAt;
  const time1 = time.split("T");
  const date = time1[0];

  let history = useHistory();

  const funkcija = () => {
    history.push("/");
  };

  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Here is your profile details</h1>
      <img src={avatar} style={{ width: "100px", display: "block" }}></img>
      <table>
        <tr>
          <td>
            <label>Name:</label>
          </td>
          <td>
            <lable>{user.user.name}</lable>
          </td>
        </tr>
        <tr>
          <td>
            <label>Email:</label>
          </td>
          <td>
            <lable>{user.user.email}</lable>
          </td>
        </tr>
        <tr>
          <td>
            <label>Created at:</label>
          </td>
          <td>
            <lable>{date}</lable>
          </td>
        </tr>
      </table>
      <Link to="/dashboard">
        <btn className="btn btn-primary" type="sumbit">
          Go back
        </btn>
      </Link>
      <Link to="/">
        <btn
          className="btn btn-danger"
          type="button"
          onClick={() => deleteAccount()}
        >
          Delete Account
        </btn>
      </Link>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(Profile);
