import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import auth from "../../reducers/auth";

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profile">
          <i class="fas fa-user"></i>
          {""}
          <span className="hide-sm">Profile</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i>
          {""}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">
          <i id="aktivan" class="fas fa-user"></i>Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i class="far fa-user"></i>Login
        </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i class="far fa-envelope"></i>
            AG email
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
