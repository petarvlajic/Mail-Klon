import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SentMessage from "../dashboard/SentMessages";
import Messages from "../dashboard/Messages";
import { loadUser } from "../../actions/auth";
import Spinner from "../layout/Spinner";
import NewMessage from "../dashboard/NewMessage";
import PrivateRoute from "../routing/PrivateRoute";

const Container = ({ auth: { user } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <Router>
        <h1 class="welcome-name">
          <i class="fas fa-door-open"></i>Welcome
          <b> {user.user.name}</b>
        </h1>

        <Switch>
          <PrivateRoute
            exact
            path="/dashboard"
            component={Messages}
          ></PrivateRoute>
        </Switch>
      </Router>
    </Fragment>
  );
};

Container.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Container);
