import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import styles from "./ProfileDoctor.module.scss";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../utils";
import webService from "../../services/webService";
import _ from "lodash";
import moment, { lang } from "moment";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
const ProfileDoctor = (props) => {
  const { idDoctor, language, showDesc, dataScheduleModal, showDetail } = props;
  // Lấy data của bác sĩ
  let [data, setData] = useState({});
  // Lấy dữ liệu doctor
  useEffect(() => {
    (async () => {
      let res = await webService.getProfileDoctorById(idDoctor);
      if (res && res.errCode === 0) {
        setData(res.data);
      }
    })();
  }, [idDoctor]);
  // Render thời gian
  const RenderTimeBooking = (props) => {
    const { dataTime } = props;
    // Fomat Date time
    let Label = moment.unix(+dataTime?.date / 1000).format("dddd- DD/MM/YYYY");
    let labelVI = `${dataTime?.timeTypeData?.valueVI} - ${
      Label.charAt(0).toUpperCase() + Label.slice(1)
    }`;
    let labelEN = `${dataTime?.timeTypeData?.valueEN} - ${moment
      .unix(+dataTime?.date / 1000)
      .locale("en")
      .format("dddd- DD/MM/YYYY")}`;
    let dateFomat = language === LANGUAGES.VI ? labelVI : labelEN;
    if (dataTime && _.isEmpty(!dataTime)) {
      return (
        <div className={styles.renderTime}>
          <h2 className={styles.time}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.datetime" />
            <span>{dateFomat}</span>
          </h2>
          <h2 className={styles.free}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.free_title" />
          </h2>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className={styles.doctor_info}>
        <div className={styles.doctor_img}>
          <img
            className={styles.doctor_img_holder}
            src={data?.image}
            alt="avatar"
          />
        </div>
        <div className={styles.doctor_name}>
          <h1 className={styles.name}>
            {language === LANGUAGES.VI
              ? `${data?.positionData?.valueVI}, ${data?.fullname}`
              : `${data?.positionData?.valueEN}, ${data?.fullname}`}
          </h1>
          {showDesc === true ? (
            <>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: data?.Markdown?.contentHTMLDesc,
                }}
              ></div>
              <p className={styles.location}>
                <GoLocation />
                {language === LANGUAGES.VI
                  ? data?.Doctor_info?.provinceType?.valueVI
                  : data?.Doctor_info?.provinceType?.valueEN}
              </p>
              {showDetail === true ? (
                <Link
                  className={styles.btn_detail}
                  to={`${path.DETAIL_DOCTOR_ID}${data.id}`}
                >
                  <FormattedMessage id="homePage.body.doctor.detail-doctor.see" />
                </Link>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <RenderTimeBooking dataTime={dataScheduleModal} />
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
