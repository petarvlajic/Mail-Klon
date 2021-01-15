import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

const Footer = (props) => {
  return (
    <div class="footer">
      <div className="logo">
        <Link to="/dashboard">
          <i class="far fa-envelope"></i>
          AG email
        </Link>
      </div>

      <ul>
        <li>
          <a href="">
            <span>About |</span>
          </a>
        </li>
        <li>
          <a href="">
            <span>Contact |</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
