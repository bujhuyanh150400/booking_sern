import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { webService } from "../services";
import Header from "../containers/Header/Home";
import styles from "./VerifyEmail.module.scss";
import Footer from "../containers/Footer/Footer";
import { FormattedMessage } from "react-intl";
// Menu
const VerifyEmail = (props) => {
  let { language } = props;
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    (async () => {
      if (props.location && props.location.search) {
        let urlParams = new URLSearchParams(props.location.search);
        let token = urlParams.get("token");
        let doctorId = urlParams.get("doctorId");

        let res = await webService.postVerifyBookingAppointment({
          token,
          doctorId,
        });
        if (res && res.errCode === 0) {
          setVerify(true);
        }
      }
    })();
  }, []);
  return (
    <>
      {/* Header */}
      <Header />
      <div className={styles.body}>
        <div className={styles.verify_body}>
          {verify === true ? (
            <>
              <h1 className={styles.title}>
                <FormattedMessage id="homePage.body.verify.title" />
              </h1>
              <p className={styles.param}>
                <FormattedMessage id="homePage.body.verify.param" />
              </p>
              <p className={styles.param_2}>
                <FormattedMessage id="homePage.body.verify.param_2" />
              </p>
              <FormattedMessage id="homePage.body.verify.param_3" />
            </>
          ) : (
            <>
              <h1 className={styles.title}>
                <FormattedMessage id="homePage.body.verify.title_false" />
              </h1>
              <p className={styles.param}>
                <FormattedMessage id="homePage.body.verify.param_false" />
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
