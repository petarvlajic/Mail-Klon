import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { loadUser } from "../../actions/auth";
import { getMessages } from "../../actions/messages";
import Messages from "./Messages";

const Dashboard = ({ auth: { user } }) => {
  useEffect(() => {
    loadUser();
    getMessages();
  }, [loadUser, getMessages]);
  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container>
        <Messages />
      </Container>
    </Fragment>
  );
};

Container.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
