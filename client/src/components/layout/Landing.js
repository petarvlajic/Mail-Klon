import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <div className="container1">
              <h1 className="x-large">AG Mail</h1>
              <p className="lead">
                AG Mail is a project for subject <br />
                Web systems and tehnology, <br />
                feel free to test!
              </p>
              <div className="buttons"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
