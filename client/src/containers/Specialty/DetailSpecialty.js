import { connect } from "react-redux";
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";

import styles from "./DetailSpecialty.module.scss";
import DoctorSchedule from "../../components/Doctor/DoctorSchedule";
import DoctorInfoHealthCare from "../../components/Doctor/DoctorInfoHealthCare";
import ProfileDoctor from "../../components/Doctor/ProfileDoctor";
import * as actions from "../../store/actions";
import Footer from "../Footer/Footer";

import { useEffect, useState } from "react";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DetailSpecialty = (props) => {
  let { language, detailSpecialtyDataRedux, provinceRedux } = props;
  const [provinceValue, setProvinceValue] = useState("ALL");
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Lấy dữ liệu
  useEffect(() => {
    props.fetchSpecialtyByIdRedux({
      id: props.match.params.id,
      location: provinceValue,
    });
    props.fetchProvinceRedux();
  }, [provinceValue]);
  let data = detailSpecialtyDataRedux;
  let provinceData = provinceRedux;

  return (
    <>
      {/* Header */}
      <Header />
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <MenuNav specialty={true} />
        </div>
        <div className={styles.right}>
          <div className={styles.container}>
            {/* Chi tiết specialty */}
            <div
              className={styles.detail_specialty}
              style={{
                background: `url(${data?.dataSpecialty?.image})`,
              }}
            >
              <div className={styles.detail_specialty_contanier}>
                <div
                  className={styles.detail_specialty_content}
                  dangerouslySetInnerHTML={{
                    __html: data?.dataSpecialty?.contentHTMLIntro,
                  }}
                ></div>
              </div>
            </div>
            {/* Lựa chọn tỉnh thành */}
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
            {/* Danh sách bác sĩ */}
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
    detailSpecialtyDataRedux: state.home.detailSpecialtyData,
    provinceRedux: state.home.province,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyByIdRedux: (data) =>
      dispatch(actions.fetchSpecialtyByIdStart(data)),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
