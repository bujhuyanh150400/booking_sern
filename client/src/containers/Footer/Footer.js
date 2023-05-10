import { connect } from "react-redux";
import styles from "./Footer.module.scss";
import logo from "../../assets/images/logo/logo-no-background.svg";
import { MdLocationOn, MdOutlineCheck } from "react-icons/md";
import { BsYoutube, BsFacebook } from "react-icons/bs";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_content}>
          <div className={styles.footer_left}>
            <div className={styles.footer_logo}>
              <img src={logo} alt="logo" className={styles.logo} />
            </div>
            <div className={styles.footer_contact}>
              <h1 className={styles.footer_name_company}>
                <FormattedMessage id="homePage.footer.company" />
              </h1>
              <h3 className={styles.location_checker}>
                <span>
                  <MdLocationOn />
                </span>
                <FormattedMessage id="homePage.footer.location" />
              </h3>
              <h3 className={styles.location_checker}>
                <span>
                  <MdOutlineCheck />
                </span>
                <FormattedMessage id="homePage.footer.checker" />
              </h3>
            </div>
          </div>
          <div className={styles.footer_right}>
            <ul className={styles.footer_navigator}>
              <li className={styles.footer_navigator_li}>
                <FormattedMessage id="homePage.footer.about" />
              </li>
              <li className={styles.footer_navigator_li}>
                <FormattedMessage id="homePage.footer.contact" />
              </li>
              <li className={styles.footer_navigator_li}>
                <FormattedMessage id="homePage.footer.security" />
              </li>
              <li className={styles.footer_navigator_li}>
                <FormattedMessage id="homePage.footer.contract" />
              </li>
            </ul>
            <div className={styles.footer_location}>
              <div className={styles.footer_location_box}>
                <h1>
                  <FormattedMessage id="homePage.footer.hanoi" />
                </h1>
                <p>
                  <FormattedMessage id="homePage.footer.location" />
                </p>
              </div>
              <div className={styles.footer_location_box}>
                <h1>
                  <FormattedMessage id="homePage.footer.hcm" />
                </h1>
                <p>
                  <FormattedMessage id="homePage.footer.location_hcm" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_copyright}>
          <h1 className={styles.copyright_content}>
            © 2023 BookingCare base on BookingCare by BuiHuyAnh.
          </h1>
          <div className={styles.copyright_social}>
            <span className={styles.copyright_facebook}>
              <BsFacebook />
            </span>
            <span className={styles.copyright_youtube}>
              <BsYoutube />
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
