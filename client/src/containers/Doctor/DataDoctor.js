import { connect } from "react-redux";
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";
import styles from "./DataDoctor.module.scss";
import * as actions from "../../store/actions";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { path } from "../../utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LANGUAGES } from "../../utils";
import ProfileDoctor from "../../components/Doctor/ProfileDoctor";
import DoctorInfoHealthCare from "../../components/Doctor/DoctorInfoHealthCare";
import DoctorSchedule from "../../components/Doctor/DoctorSchedule";
import { FaUserNurse, FaHeadphones } from "react-icons/fa";
import { FiCheckSquare, FiClock } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { BsHeartPulse } from "react-icons/bs";

const DataDoctor = (props) => {
  let {
    getListDoctorByProvinceRedux,
    listDoctor,
    fetchProvinceRedux,
    provinceRedux,
    language,
  } = props;
  // State
  const [provinceValue, setProvinceValue] = useState("ALL");
  let history = useHistory();
  const handleViewDetailSpecialty = (data) => {
    history.push(`${path.DETAIL_CLINIC_ID}${data.id}`);
  };
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // fire dispatch để lấy dữ liệu
  // Lấy data
  useEffect(() => {
    getListDoctorByProvinceRedux(provinceValue);
    fetchProvinceRedux();
  }, [provinceValue]);
  let data = listDoctor;
  let provinceData = provinceRedux;
  return (
    <>
      {/* Header */}
      <Header />
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <MenuNav doctor={true} />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <FormattedMessage id="Doctor.Data.title" />
            </h1>
            <div className={styles.card_container}>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <FaUserNurse />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card1_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card1_p" />
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <FiCheckSquare />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card2_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card2_p" />
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <FaHeadphones />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card3_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card3_p" />
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <FiClock />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card4_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card4_p" />
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <GiReceiveMoney />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card5_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card5_p" />
                  </p>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <BsHeartPulse />
                </div>
                <div className={styles.card_content}>
                  <h2 className={styles.card_title}>
                    <FormattedMessage id="Doctor.Data.card6_title" />
                  </h2>
                  <p className={styles.card_p}>
                    <FormattedMessage id="Doctor.Data.card6_p" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <FormControl className={styles.select_holder}>
            <InputLabel id="select_province_specialty_detail">
              <FormattedMessage id="menu.Admin_role.manager-clinic.province" />
            </InputLabel>
            <Select
              labelId="select_province_specialty_detail"
              id="select_province_specialty_detail"
              value={provinceValue}
              label="province"
              onChange={(e) => setProvinceValue(e.target.value)}
            >
              <MenuItem value="ALL">
                {language === LANGUAGES.VI ? "Toàn quốc" : "All"}
              </MenuItem>
              {provinceData &&
                provinceData.length > 0 &&
                provinceData.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.keyMap}>
                      {props.language === LANGUAGES.VI
                        ? item.valueVI
                        : item.valueEN}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <div className={styles.detail_doctorArr}>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <div className={styles.detail_doctor_box}>
                    <div className={styles.left_holder}>
                      <ProfileDoctor
                        idDoctor={item?.id}
                        showDesc={true}
                        showDetail={true}
                      />
                    </div>
                    <div className={styles.right_holder}>
                      <div className={styles.up_holder}>
                        <DoctorInfoHealthCare idDoctor={item?.id} key={index} />
                      </div>
                      <div className={styles.down_holder}>
                        <DoctorSchedule idDoctor={item?.id} key={index} />;
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.no_doctor}>
                <FormattedMessage id="homePage.body.specialties.no_doctor" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctor: state.home.listDoctor,
    provinceRedux: state.home.province,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDoctorByProvinceRedux: (province) =>
      dispatch(actions.getListDoctorByProvinceStart(province)),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataDoctor);
