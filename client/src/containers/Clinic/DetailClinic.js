import { connect } from "react-redux";
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";

import styles from "./DetailClinic.module.scss";
import DoctorSchedule from "../../components/Doctor/DoctorSchedule";
import DoctorInfoHealthCare from "../../components/Doctor/DoctorInfoHealthCare";
import ProfileDoctor from "../../components/Doctor/ProfileDoctor";
import * as actions from "../../store/actions";
import Footer from "../Footer/Footer";

import { useEffect, useState } from "react";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { Tabs, Tab, Box } from "@mui/material/";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel_clinic-${index}`}
    >
      {value === index && (
        <Box>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
const DetailClinic = (props) => {
  let { language, detailClinicDataRedux, fetchClinicByIdRedux } = props;
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Lấy dữ liệu
  useEffect(() => {
    fetchClinicByIdRedux({
      id: props.match.params.id,
    });
  }, []);
  let data = detailClinicDataRedux;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* Header */}
      <Header />
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <MenuNav clinic={true} />
        </div>
        <div className={styles.right}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.clinic_info_container}>
                <div className={styles.clinic_info_content}>
                  <div className={styles.header_left}>
                    <img
                      className={styles.img_clinic}
                      src={data?.dataClinic?.image}
                      alt="avatar"
                    />
                  </div>
                  <div className={styles.header_right}>
                    <h1 className={styles.name_clinic}>
                      {data?.dataClinic?.name}
                    </h1>
                    <h2 className={styles.address_clinic}>
                      {data?.dataClinic?.address}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <Tabs
              className={styles.tabs}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={<FormattedMessage id="Clinic.Detail.tab1" />} />
              <Tab label={<FormattedMessage id="Clinic.Detail.tab2" />} />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <div className={styles.detail_clinic_container}>
              <div className={styles.guide_container}>
                <div className={styles.guide1}>
                  <FormattedMessage id="Clinic.Detail.guide1" />
                </div>
                <div className={styles.guide2}>
                  <p>
                    <FormattedMessage id="Clinic.Detail.guide2" />
                    <span>{data?.dataClinic?.name}</span>
                    <FormattedMessage id="Clinic.Detail.guide2_2" />
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="Clinic.Detail.li1" />
                    </li>
                    <li>
                      <FormattedMessage id="Clinic.Detail.li2" />
                    </li>
                    <li>
                      <FormattedMessage id="Clinic.Detail.li3" />
                    </li>
                    <li>
                      <FormattedMessage id="Clinic.Detail.li4" />
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={styles.detail_clinic_content}
                dangerouslySetInnerHTML={{
                  __html: data?.dataClinic?.contentHTMLIntro,
                }}
              ></div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={styles.detail_doctorArr}>
              {data?.dataDoctor && data?.dataDoctor.length > 0 ? (
                data?.dataDoctor.map((item, index) => {
                  return (
                    <div className={styles.detail_doctor_box}>
                      <div className={styles.left_holder}>
                        <ProfileDoctor
                          idDoctor={item?.doctorId}
                          showDesc={true}
                          showDetail={true}
                        />
                      </div>
                      <div className={styles.right_holder}>
                        <div className={styles.up_holder}>
                          <DoctorInfoHealthCare
                            idDoctor={item?.doctorId}
                            key={index}
                          />
                        </div>
                        <div className={styles.down_holder}>
                          <DoctorSchedule
                            idDoctor={item?.doctorId}
                            key={index}
                          />
                          ;
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
          </TabPanel>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailClinicDataRedux: state.home.detailClinicData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicByIdRedux: (data) =>
      dispatch(actions.fetchClinicByIdStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
