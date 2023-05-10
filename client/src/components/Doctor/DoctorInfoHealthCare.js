import { connect } from "react-redux";
import styles from "./DoctorInfoHealthCare.module.scss";
import { useEffect, useState } from "react";
import { LANGUAGES } from "../../utils";
import webService from "../../services/webService";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
const DoctorInfoHealthCare = (props) => {
  let { idDoctor, language } = props;
  const [open, setOpen] = useState(false);
  const [dataInfo, setDataInfo] = useState();
  //   Lấy thông tin data để render
  useEffect(() => {
    (async () => {
      let res = await webService.getExtraInfoDoctorById(idDoctor);
      if (res && res.errCode === 0) {
        setDataInfo(res.data);
      }
    })();
  }, [idDoctor]);
  return (
    <>
      <div className={styles.body}>
        <div className={styles.location_cinic}>
          <h2 className={styles.title}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.info-cinic" />
          </h2>
          <p className={styles.clinic_name}>{dataInfo?.nameClinic}</p>
          <p className={styles.province}>
            <span>
              <FormattedMessage id="homePage.body.doctor.detail-doctor.City" />
            </span>
            {language === LANGUAGES.VI
              ? dataInfo?.provinceType?.valueVI
              : dataInfo?.provinceType?.valueEN}
          </p>
          <p className={styles.name_location}>
            <span>
              <FormattedMessage id="homePage.body.doctor.detail-doctor.name_location" />
            </span>
            {dataInfo?.Clinic?.name}
          </p>
          <p className={styles.location}>
            <span>
              <FormattedMessage id="homePage.body.doctor.detail-doctor.location" />
            </span>
            {dataInfo?.Clinic?.address}
          </p>
        </div>
        <div className={styles.row}></div>
        <div className={styles.pricement_holder}>
          <h2 className={styles.title}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.price" />
            {language === LANGUAGES.VI ? (
              <NumericFormat
                value={dataInfo?.priceType?.valueVI}
                displayType="text"
                thousandSeparator={true}
                suffix="VND"
              />
            ) : (
              <NumericFormat
                value={dataInfo?.priceType?.valueEN}
                displayType="text"
                thousandSeparator={true}
                suffix="$"
              />
            )}
            <button onClick={() => setOpen(!open)}>
              {open ? (
                <FormattedMessage id="homePage.body.doctor.detail-doctor.not_see" />
              ) : (
                <FormattedMessage id="homePage.body.doctor.detail-doctor.see" />
              )}
            </button>
          </h2>
          <PriceMent open={open} dataInfo={dataInfo} language={language} />
        </div>
      </div>
    </>
  );
};

const PriceMent = (props) => {
  const { open, dataInfo, language } = props;
  return (
    <>
      {open && (
        <div className={styles.pricement}>
          <p className={styles.payment}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.payment" />
            {language === LANGUAGES.VI
              ? dataInfo?.paymentType?.valueVI
              : dataInfo?.paymentType?.valueEN}
          </p>
          <p className={styles.note}>
            <FormattedMessage id="homePage.body.doctor.detail-doctor.note" />
            {dataInfo?.note}
          </p>
        </div>
      )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorInfoHealthCare);
