import { connect } from "react-redux";
import Header from "../Header/Home";
import Footer from "../Footer/Footer";
import styles from "./DetailDoctor.module.scss";
import * as actions from "../../store/actions";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LANGUAGES } from "../../utils";
import DoctorInfoHealthCare from "../../components/Doctor/DoctorInfoHealthCare";
import DoctorSchedule from "../../components/Doctor/DoctorSchedule";
import ProfileDoctor from "../../components/Doctor/ProfileDoctor";
import MenuNav from "../Header/Home/MenuNav";
const DetailDoctor = (props) => {
  // Ngôn ngữ
  const { language, doctorRedux } = props;
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Lấy data của bác sĩ
  useEffect(() => {
    props.fetchDoctorByIdRedux(props.match.params.id);
  }, []);
  let data = doctorRedux;
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
          <div className={styles.container}>
            <div className={styles.doctor_header}>
              <ProfileDoctor idDoctor={data?.id} showDesc={true} />
              <div className={styles.booking_holder}>
                <div className={styles.booking_left}>
                  <DoctorSchedule idDoctor={data?.id} />
                </div>
                <div className={styles.booking_right}>
                  <DoctorInfoHealthCare idDoctor={data?.id} />
                </div>
              </div>
            </div>
            <div className={styles.doctor_body}>
              <div
                className={styles.doctor_infomation}
                dangerouslySetInnerHTML={{
                  __html: data?.Markdown?.contentHTMLIntro,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorRedux: state.system.doctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorByIdRedux: (id) => dispatch(actions.fetchDoctorByIdStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
