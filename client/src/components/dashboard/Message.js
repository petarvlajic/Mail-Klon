import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Message = ({ auth: { user } }) => {
  useEffect(() => {
    console.log("aaa");
    const messages = user.user.messages.map(x);
    console.log(messages);
  }, []);
  return <Fragment></Fragment>;
};

Container.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Message);
