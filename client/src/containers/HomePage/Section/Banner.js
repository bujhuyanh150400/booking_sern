import { connect } from "react-redux";
import styles from "../HomePage.module.scss";
import clsx from "clsx";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Col, Row } from "reactstrap";
import { BsHospital } from "react-icons/bs";
import { MdMobileFriendly } from "react-icons/md";
import { FaHospitalUser, FaTooth, FaHeadSideMask, FaBed } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { path } from "../../../utils";
import logo from "../../../assets/images/logo/logo-no-background.svg";

const Banner = (props) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_container}>
        <div className={styles.banner_content}>
          <div className={styles.banner_header}>
            <h2 className={styles.banner_title_first}>
              <FormattedMessage id="homePage.body.searching.title-first" />
            </h2>
            <h2 className={styles.banner_title_second}>
              <FormattedMessage id="homePage.body.searching.title-second" />
            </h2>
            <Link
              to={path.LIST_SPECIALTY}
              className={styles.btn_link_specialty}
            >
              <FormattedMessage id="homePage.body.searching.booking" />
            </Link>
          </div>
          <div className={styles.banner_download}>
            <img className={styles.logo_banner} src={logo} alt="logo" />
            <div className={styles.banner_download_holder}>
              <button className={styles.google}></button>
              <button className={styles.apple}></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
