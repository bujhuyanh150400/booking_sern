import { connect } from "react-redux";
import styles from "./Header.module.scss";

import { FormattedMessage } from "react-intl";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import {
  FaHospitalAlt,
  FaHandHoldingMedical,
  FaBookMedical,
} from "react-icons/fa";

// Redux
import { path } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions/appActions";

const MenuNav = (props) => {
  const { handbook, clinic, specialty, doctor } = props;
  return (
    <>
      {/* Menu */}
      <div className={styles.navbar_menu}>
        <ul className={styles.navbar_ul}>
          <li className={clsx(styles.navbar_li_home)}>
            <Link
              to={path.HOMEPAGE}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <AiOutlineHome />
            </Link>
          </li>
          <li
            className={clsx(styles.navbar_li, {
              [styles.active]: specialty,
            })}
          >
            <Link to={path.LIST_SPECIALTY}>
              <FaBookMedical />
              <FormattedMessage id="homePage.navbar.Specialist" />
            </Link>
          </li>
          <li
            className={clsx(styles.navbar_li, {
              [styles.active]: clinic,
            })}
          >
            <Link to={path.LIST_CLINIC}>
              <FaHospitalAlt />
              <FormattedMessage id="homePage.navbar.Healthfacilities" />
            </Link>
          </li>
          <li
            className={clsx(styles.navbar_li, {
              [styles.active]: doctor,
            })}
          >
            <Link to={path.LIST_DOCTOR}>
              <FaHandHoldingMedical />
              <FormattedMessage id="homePage.navbar.Doctor" />
            </Link>
          </li>
       
        </ul>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNav);
