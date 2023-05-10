import { connect } from "react-redux";
import webService from "../../services/webService";
import { useEffect, useState } from "react";
import styles from "./LadingPageHome.module.scss";
import { USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import logo from "../../assets/images/banner/bg-login.jpg";
const LadingPageHome = (props) => {
  let { userInfo } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              <FormattedMessage id="LadingSystem.title" />
              {userInfo.fullname}
            </h1>
            <p className={styles.para1}>
              <FormattedMessage id="LadingSystem.p1" />
            </p>
            <p className={styles.para2}>
              @Product by BuiHuyAnh get ideas from Bookingcare
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LadingPageHome);
