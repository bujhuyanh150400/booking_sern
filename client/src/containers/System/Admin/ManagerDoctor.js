import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../../store/actions";
import styles from "./ManagerDoctor.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

const ManagerDoctor = (props) => {
  // props
  let {
    language,
    doctorsRedux,
    dataReqDoctorRedux,
    doctorById,
    fetchDoctorRedux,
    getRequireDoctorInfoRedux,
    fetchAllSpecialtyRedux,
    fetchAllClinicRedux,
    dataAllClinic,
    dataAllSpecialty,
    saveDetailDoctorRedux,
    resSaveDetailDoctor,
  } = props;
  // State
  const [selectDoctor, setSelectDoctor] = useState("");

  const [contentHTMLIntro, setContentHTMLIntro] = useState("");
  const [contentMarkDownIntro, setContentMarkDownIntro] = useState("");
  const [contentHTMLDesc, setContentHTMLDesc] = useState("");
  const [contentMarkDownDesc, setContentMarkDownDesc] = useState("");

  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [province, setProvince] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [note, setNote] = useState("");

  const [oldData, setOldData] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [popupCreate, setPopupCreate] = useState(false);
  const [dataClinicForSelect, setDataNewClinicForSelect] = useState([]);
  // xử lí lấy thông tin lấy dữ liệu doctors

  useEffect(() => {
    fetchDoctorRedux();
    getRequireDoctorInfoRedux();
    fetchAllSpecialtyRedux();
    fetchAllClinicRedux();
  }, []);
  let doctors = doctorsRedux;
  let resPayment = dataReqDoctorRedux?.resPayment;
  let resPrice = dataReqDoctorRedux?.resPrice;
  let resProvince = dataReqDoctorRedux?.resProvince;
  let dataSpecialty = dataAllSpecialty;
  // Sử lí select doctor
  useEffect(() => {
    (async () => {
      await props.getDoctorByIdRedux(selectDoctor);
    })();
  }, [selectDoctor]);
  // in ra dữ liệu thông tin của doctor để edit
  useEffect(() => {
    if (doctorById.Doctor_info && doctorById.Markdown) {
      if (doctorById.Doctor_info !== null) {
        setPayment(doctorById.Doctor_info?.paymentId);
        setProvince(doctorById.Doctor_info?.provinceId);
        setPrice(doctorById.Doctor_info?.priceId);
        setSpecialty(doctorById.Doctor_info?.specialtyId);
        setClinic(doctorById.Doctor_info?.clinicId);
        setNote(doctorById?.Doctor_info?.note);
      } else {
        setPayment("");
        setProvince("");
        setPrice("");
        setSpecialty("");
        setClinic("");
        setNote("");
      }
      if (doctorById.Markdown !== null) {
        setContentHTMLIntro(doctorById?.Markdown?.contentHTMLIntro);
        setContentMarkDownIntro(doctorById?.Markdown?.contentMarkDownIntro);
        setContentHTMLDesc(doctorById?.Markdown?.contentHTMLDesc);
        setContentMarkDownDesc(doctorById?.Markdown?.contentMarkDownDesc);
      } else {
        setContentHTMLIntro("");
        setContentMarkDownIntro("");
        setContentHTMLDesc("");
        setContentMarkDownDesc("");
      }
      setOldData(true);
    } else {
      setContentHTMLIntro("");
      setContentMarkDownIntro("");
      setContentHTMLDesc("");
      setContentMarkDownDesc("");
      setPayment("");
      setProvince("");
      setPrice("");
      setSpecialty("");
      setClinic("");
      setNote("");
      setOldData(false);
    }
  }, [doctorById]);

  // Markdown intro & description
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleEditorIntro = ({ html, text }) => {
    setContentHTMLIntro(html);
    setContentMarkDownIntro(text);
  };
  const handleEditorDesc = ({ html, text }) => {
    setContentHTMLDesc(html);
    setContentMarkDownDesc(text);
  };

  // validate
  useEffect(() => {
    if (
      selectDoctor &&
      contentHTMLIntro &&
      contentMarkDownIntro &&
      contentHTMLDesc &&
      contentMarkDownDesc &&
      price &&
      payment &&
      province &&
      specialty &&
      clinic
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    selectDoctor,
    contentHTMLIntro,
    contentMarkDownIntro,
    contentHTMLDesc,
    contentMarkDownDesc,
    price,
    payment,
    province,
    specialty,
    clinic,
  ]);
  // Xử lí submit
  const handleSubmit = () => {
    saveDetailDoctorRedux({
      contentHTMLIntro,
      contentMarkDownIntro,
      contentHTMLDesc,
      contentMarkDownDesc,
      doctorId: selectDoctor,
      priceId: price,
      provinceId: province,
      paymentId: payment,
      specialtyId: specialty,
      clinicId: clinic,
      note,
      action: oldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    if (resSaveDetailDoctor === 0) {
      setPopupCreate(true);
    } else {
      setPopupCreate(true);
    }
  };
  // Xử lí chọn tỉnh thành phù hợp với cơ sở y tế và cả res
  useEffect(() => {
    setDataNewClinicForSelect(
      dataAllClinic.rows.filter((item) => {
        return item.provinceId === province;
      })
    );
  }, [resSaveDetailDoctor, province, dataAllClinic.rows]);
  // Render
  return (
    <>
      {/*  */}
      <Snackbar
        open={popupCreate}
        autoHideDuration={3000}
        onClose={() => setPopupCreate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupCreate(false)}
          severity={resSaveDetailDoctor === 0 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {resSaveDetailDoctor === 0
            ? "Lưu thông tin thành công"
            : "Lưu thông tin thất bại"}
        </Alert>
      </Snackbar>
      {/* Container */}
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="manager-doctor.header-title" />
        </h1>
        <div className={styles.body}>
          {/* Select doctor */}
          <FormControl variant="outlined" className={styles.select_doctor}>
            <InputLabel id="doctor_select_detail">
              <FormattedMessage id="manager-doctor.select-doctor" />
            </InputLabel>
            <Select
              labelId="doctor_select_detail"
              className={styles.select_doctor_select}
              value={selectDoctor}
              onChange={(e) => setSelectDoctor(e.target.value)}
              label="select doctor"
            >
              {doctors &&
                doctors.length > 0 &&
                doctors.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.fullname}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {/* Khu vực giới thiệu */}
          {selectDoctor && (
            <div className={styles.doctor_info}>
              {/* Các danh mục */}
              <div className={styles.doctor_category}>
                {/* Giá cả */}
                <FormControl variant="outlined" className={styles.doctor_price}>
                  <InputLabel id="doctor_select_price">
                    <FormattedMessage id="manager-doctor.price" />
                  </InputLabel>
                  <Select
                    labelId="doctor_select_price"
                    className={styles.doctor_category_select}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    label="Price of medical "
                  >
                    {resPrice &&
                      resPrice.length > 0 &&
                      resPrice.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.keyMap}>
                            {language === LANGUAGES.VI
                              ? item?.valueVI
                              : item?.valueEN}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                {/* Thanh toán */}
                <FormControl
                  variant="outlined"
                  className={styles.doctor_payment}
                >
                  <InputLabel id="doctor_select_payment">
                    <FormattedMessage id="manager-doctor.payment" />
                  </InputLabel>
                  <Select
                    labelId="doctor_select_payment"
                    className={styles.doctor_category_select}
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    label="Payment method "
                  >
                    {resPayment &&
                      resPayment.length > 0 &&
                      resPayment.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.keyMap}>
                            {language === LANGUAGES.VI
                              ? item?.valueVI
                              : item?.valueEN}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                {/* Chuyên khoa */}
                <FormControl
                  variant="outlined"
                  className={styles.doctor_specialties}
                >
                  <InputLabel id="doctor_select_specialties">
                    <FormattedMessage id="manager-doctor.specialty" />
                  </InputLabel>
                  <Select
                    labelId="doctor_select_specialties"
                    className={styles.doctor_category_select}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    label="choose specialty"
                  >
                    {dataSpecialty &&
                      dataSpecialty.length > 0 &&
                      dataSpecialty.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.id}>
                            {item?.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                {/* Tỉnh thành */}
                <FormControl
                  variant="outlined"
                  className={styles.doctor_province}
                >
                  <InputLabel id="doctor_select_province">
                    <FormattedMessage id="manager-doctor.province" />
                  </InputLabel>
                  <Select
                    labelId="doctor_select_province"
                    className={styles.doctor_category_select}
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    label="province"
                  >
                    {resProvince &&
                      resProvince.length > 0 &&
                      resProvince.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item?.keyMap}>
                            {language === LANGUAGES.VI
                              ? item?.valueVI
                              : item?.valueEN}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText id="doctor_select_province">
                    {language === LANGUAGES.VI
                      ? "Chọn tỉnh thành xong, hãy chọn cơ sở y tế"
                      : "After choosing a province, choose a medical facility"}
                  </FormHelperText>
                </FormControl>
                {/* Phòng khám */}
                <FormControl
                  variant="outlined"
                  className={styles.doctor_clinic}
                >
                  <InputLabel id="doctor_select_clinic">
                    <FormattedMessage id="manager-doctor.clinic" />
                  </InputLabel>
                  <Select
                    labelId="doctor_select_clinic"
                    className={styles.doctor_category_select}
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    label="choose clinic"
                  >
                    {dataClinicForSelect.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.id}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText id="doctor_select_clinic">
                    {language === LANGUAGES.VI
                      ? "Xin hãy chọn tỉnh thành trước"
                      : "Please choose your province first"}
                  </FormHelperText>
                </FormControl>
                {/* note */}
                <FormControl variant="outlined" className={styles.doctor_note}>
                  <InputLabel id="doctor_note">
                    <FormattedMessage id="manager-doctor.note" />
                  </InputLabel>
                  <OutlinedInput
                    id="doctor_note"
                    className={styles.doctor_note}
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    label="Note"
                  />
                </FormControl>
              </div>
              {/* Miêu tả bác sĩ */}
              <div className={styles.desc_doctor}>
                <h2 className={styles.desc_doctor_title}>
                  <FormattedMessage id="manager-doctor.description" />
                </h2>
                <MdEditor
                  style={{ height: "200px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorDesc}
                  value={contentMarkDownDesc}
                />
              </div>
              {/* Giới thiệu */}
              <div className={styles.intro_doctor}>
                <h2 className={styles.intro_doctor_title}>
                  <FormattedMessage id="manager-doctor.introduce" />
                </h2>
                <MdEditor
                  style={{ height: "300px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorIntro}
                  value={contentMarkDownIntro}
                />
              </div>
              {/* Submit */}
              <div className={styles.submit}>
                {isValid ? (
                  <Button className={styles.submit_btn} onClick={handleSubmit}>
                    {oldData === true ? (
                      <FormattedMessage id="manager-doctor.save" />
                    ) : (
                      <FormattedMessage id="manager-doctor.create" />
                    )}
                  </Button>
                ) : (
                  <Button className={styles.submit_btn_unsave} disabled>
                    {oldData === true ? (
                      <FormattedMessage id="manager-doctor.save" />
                    ) : (
                      <FormattedMessage id="manager-doctor.create" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorsRedux: state.system.AllDoctor,
    doctorById: state.system.doctor,
    dataReqDoctorRedux: state.system.dataReqDoctor,
    dataAllClinic: state.system.dataAllClinic,
    dataAllSpecialty: state.system.dataAllSpecialty,
    resSaveDetailDoctor: state.system.resSaveDetailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
    fetchAllSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
    fetchAllClinicRedux: () => dispatch(actions.fetchAllClinicStart()),

    saveDetailDoctorRedux: (data) =>
      dispatch(actions.saveDetailDoctorStart(data)),
    getDoctorByIdRedux: (id) => dispatch(actions.fetchDoctorByIdStart(id)),

    getRequireDoctorInfoRedux: () =>
      dispatch(actions.getRequireDoctorInfoStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
