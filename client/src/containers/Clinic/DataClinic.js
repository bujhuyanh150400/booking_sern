import { connect } from "react-redux";
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";

import styles from "./DataClinic.module.scss";
import * as actions from "../../store/actions";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AnimatedShowMore from "react-animated-show-more";
import { FormattedMessage } from "react-intl";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";
import { path } from "../../utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LANGUAGES } from "../../utils";
const DataClinic = (props) => {
  let {
    getListClinicByProvinceRedux,
    listClinic,
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
  // Lấy data
  useEffect(() => {
    getListClinicByProvinceRedux(provinceValue);
    fetchProvinceRedux();
  }, [provinceValue]);
  let data = listClinic;
  let provinceData = provinceRedux;
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
          <div className={styles.header}>
            <h1 className={styles.title}>
              <FormattedMessage id="Clinic.Data.title" />
            </h1>
            <div className={styles.param}>
              <FormattedMessage id="Clinic.Data.p1" />
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
          <div className={styles.clinic_holder}>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={index} className={styles.card}>
                    <img
                      className={styles.img_holder}
                      src={item?.image}
                      alt="specialty"
                    ></img>
                    <div className={styles.content}>
                      <div className={styles.name_detail}>
                        <h1 className={styles.name}>{item?.name}</h1>
                        <div className={styles.detail_holder}>
                          <AnimatedShowMore
                            height={0}
                            toggle={({ isOpen }) =>
                              isOpen ? (
                                <FormattedMessage id="close" />
                              ) : (
                                <FormattedMessage id="seemore" />
                              )
                            }
                            speed={100}
                          >
                            <div
                              className={styles.detail}
                              dangerouslySetInnerHTML={{
                                __html: item.contentHTMLIntro,
                              }}
                            ></div>
                          </AnimatedShowMore>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleViewDetailSpecialty(item)}
                        className={styles.booking_btn}
                      >
                        <FormattedMessage id="homePage.body.specialties.booking" />
                      </Button>
                    </div>
                  </div>
                );
              })}
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
    listClinic: state.home.listClinic,
    provinceRedux: state.home.province,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicByProvinceRedux: (province) =>
      dispatch(actions.getListClinicByProvinceStart(province)),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataClinic);
