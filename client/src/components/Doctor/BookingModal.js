import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import styles from "./BookingModal.module.scss";

import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, LANGUAGES } from "../../utils";
import clsx from "clsx";

import ProfileDoctor from "./ProfileDoctor";
import { NumericFormat } from "react-number-format";
import webService from "../../services/webService";
import moment from "moment";
import _ from "lodash";
import Loading from "../Loading";
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditNoteIcon from "@mui/icons-material/EditNote";
const BookingModal = (props) => {
  // props
  const {
    openModal,
    language,
    idDoctor,
    data,
    handleCloseModal,
    dataScheduleModal,
    userInfo,
  } = props;
  // state input
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [reason, setReason] = useState("");
  const [timeDate, setTimeDate] = useState("");
  // Validate
  const [emailValidate, setEmailValidate] = useState(false);
  const [fullnameValidate, setFullnameValidate] = useState(false);
  const [phonenumberValidate, setPhonenumberValidate] = useState(false);
  const [addressValidate, setAddressValidate] = useState(false);
  const [genderValidate, setGenderValidate] = useState(false);
  const [err, setErr] = useState(true);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  // truyền select gender
  useEffect(() => {
    props.getGenderStart();
  }, []);
  const genderArr = props.genderRedux;

  //validate
  const handleValidate = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!fullname) {
      setFullnameValidate(true);
    } else {
      setFullnameValidate(false);
    }
    if (!gender) {
      setGenderValidate(true);
    } else {
      setGenderValidate(false);
    }
    if (phonenumber.length !== 10) {
      setPhonenumberValidate(true);
    } else {
      setPhonenumberValidate(false);
    }
    if (!email.match(emailRegex)) {
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }
    if (!address) {
      setAddressValidate(true);
    } else {
      setAddressValidate(false);
    }
  };
  // Fomat Date time
  useEffect(() => {
    let Label = moment
      .unix(+dataScheduleModal?.date / 1000)
      .format("dddd- DD/MM/YYYY");
    let labelVI = `${dataScheduleModal?.timeTypeData?.valueVI} - ${
      Label.charAt(0).toUpperCase() + Label.slice(1)
    }`;
    let labelEN = `${dataScheduleModal?.timeTypeData?.valueEN} - ${moment
      .unix(+dataScheduleModal?.date / 1000)
      .locale("en")
      .format("dddd- DD/MM/YYYY")}`;
    let dateFomat = language === LANGUAGES.VI ? labelVI : labelEN;

    if (dataScheduleModal && _.isEmpty(!dataScheduleModal)) {
      setTimeDate(`${dateFomat}`);
    }
  }, [dataScheduleModal, language]);
  // Xử lí submit
  const handleSubmit = async () => {
    handleValidate();
    if (
      !fullnameValidate &&
      !genderValidate &&
      !addressValidate &&
      !emailValidate &&
      !phonenumberValidate
    ) {
      setLoading(true);
      let res = await webService.postBookingAppointment({
        email,
        fullname,
        phonenumber,
        address,
        gender,
        doctorId: idDoctor,
        date: dataScheduleModal?.date,
        timeType: dataScheduleModal?.timeType,
        reason,
        language,
        timeDate,
        doctorName: dataScheduleModal?.doctorData?.fullname,
      });
      if (res && res.errCode === 0) {
        if (userInfo?.roleId === "R3") {
          setLoading(false);
          setEmail(userInfo.email);
          setFullname(userInfo.fullname);
          setPhonenumber(userInfo.phonenumber);
          setAddress(userInfo.address);
          setGender(userInfo.gender);
          setReason("");
          handleCloseModal();
          setNotification(true);
          setErr(false);
        } else {
          setLoading(false);
          setEmail("");
          setFullname("");
          setPhonenumber("");
          setAddress("");
          setGender("");
          setReason("");
          handleCloseModal();
          setNotification(true);
          setErr(false);
        }
      } else {
        setLoading(false);
        setNotification(true);
        setErr(true);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userInfo?.roleId === "R3") {
      setEmail(userInfo.email);
      setFullname(userInfo.fullname);
      setPhonenumber(userInfo.phonenumber);
      setAddress(userInfo.address);
      setGender(userInfo.gender);
    }
  }, [userInfo]);
  return (
    <>
      {loading && <Loading />}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={styles.body}>
          <div className={styles.left}>
            {/* Profile doctor */}
            <ProfileDoctor
              idDoctor={idDoctor}
              showDesc={false}
              dataScheduleModal={dataScheduleModal}
            />
            {/* Chi tiết phòng khám */}
            <div className={styles.detail_holder}>
              <h2>
                <FormattedMessage id="homePage.body.doctor.modal_booking.info_title" />
              </h2>
              <p>
                <FormattedMessage id="homePage.body.doctor.modal_booking.name_clinic" />
                <span>{data?.Doctor_info?.Clinic?.name}</span>
              </p>
              <p>
                <FormattedMessage id="homePage.body.doctor.modal_booking.location_clinic" />
                <span>{data?.Doctor_info?.Clinic?.address}</span>
              </p>
              <p>
                <FormattedMessage id="homePage.body.doctor.modal_booking.price" />
                <span>
                  {language === LANGUAGES.VI ? (
                    <NumericFormat
                      value={data?.Doctor_info?.priceType?.valueVI}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="VND"
                    />
                  ) : (
                    <NumericFormat
                      value={data?.Doctor_info?.priceType?.valueEN}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="$"
                    />
                  )}
                </span>
              </p>
            </div>
            <div className={styles.note_holder}>
              <div className={styles.note_holder_up}>
                <div className={styles.payment_p}>
                  <p className={styles.price_p}>
                    <FormattedMessage id="homePage.body.doctor.modal_booking.price" />
                  </p>
                  <p className={styles.booking_p}>
                    <FormattedMessage id="homePage.body.doctor.modal_booking.booking_p" />
                  </p>
                </div>
                <div className={styles.payment_price}>
                  <p className={styles.price_num}>
                    {language === LANGUAGES.VI ? (
                      <NumericFormat
                        value={data?.Doctor_info?.priceType?.valueVI}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="VND"
                      />
                    ) : (
                      <NumericFormat
                        value={data?.Doctor_info?.priceType?.valueEN}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="$"
                      />
                    )}
                  </p>
                  <p className={styles.booking_num}>
                    <FormattedMessage id="homePage.body.doctor.modal_booking.booking_num" />
                  </p>
                </div>
              </div>
              <div className={styles.row}></div>
              <div className={styles.note_holder_down}>
                <p className={styles.total_p}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.total_p" />
                </p>
                <p className={styles.total_price}>
                  {language === LANGUAGES.VI ? (
                    <NumericFormat
                      value={data?.Doctor_info?.priceType?.valueVI}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="VND"
                    />
                  ) : (
                    <NumericFormat
                      value={data?.Doctor_info?.priceType?.valueEN}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="$"
                    />
                  )}
                </p>
              </div>
            </div>
            <div className={styles.attentive_holder}>
              <h2>
                <FormattedMessage id="homePage.body.doctor.modal_booking.attentive" />
              </h2>
              <p>
                <FormattedMessage id="homePage.body.doctor.modal_booking.attentive_p" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.attentive_li1" />
                </li>
                <li>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.attentive_li2" />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.form_holder}>
              <h2 className={styles.note}>
                <FormattedMessage id="homePage.body.doctor.modal_booking.note_holder" />
              </h2>
              {/* Họ tên */}
              <FormControl svariant="outlined" className={styles.form_control}>
                <InputLabel error={fullnameValidate} className={styles.label}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.name" />
                </InputLabel>
                <OutlinedInput
                  error={fullnameValidate}
                  className={styles.input}
                  id="fullname_form_booking"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  label="your full name"
                />
                {fullnameValidate && (
                  <FormHelperText
                    error={fullnameValidate}
                    id="fullname_form_booking"
                  >
                    <FormattedMessage id="homePage.body.doctor.modal_booking.name-alert" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Giới tính */}
              <FormControl svariant="outlined" className={styles.form_control}>
                <InputLabel error={genderValidate} className={styles.label}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.gender" />
                </InputLabel>
                <Select
                  error={genderValidate}
                  className={styles.input}
                  id="gender-form_booking"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="gender"
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((genders, index) => {
                      return (
                        <MenuItem key={index} value={genders.keyMap}>
                          {props.language === LANGUAGES.VI
                            ? genders.valueVI
                            : genders.valueEN}
                        </MenuItem>
                      );
                    })}
                </Select>
                {fullnameValidate && (
                  <FormHelperText
                    error={genderValidate}
                    id="gender-form_booking"
                  >
                    <FormattedMessage id="homePage.body.doctor.modal_booking.gender-alert" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* SDT */}
              <FormControl svariant="outlined" className={styles.form_control}>
                <InputLabel
                  error={phonenumberValidate}
                  className={styles.label}
                >
                  <FormattedMessage id="homePage.body.doctor.modal_booking.phonenumber" />
                </InputLabel>
                <OutlinedInput
                  error={phonenumberValidate}
                  className={styles.input}
                  id="phonenumber_form_booking"
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  }
                  label="phone number"
                />
                {phonenumberValidate && (
                  <FormHelperText
                    error={phonenumberValidate}
                    id="phonenumber_form_booking"
                  >
                    <FormattedMessage id="homePage.body.doctor.modal_booking.phonenumber-alert" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Email */}
              <FormControl svariant="outlined" className={styles.form_control}>
                <InputLabel error={emailValidate} className={styles.label}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.email" />
                </InputLabel>
                <OutlinedInput
                  error={emailValidate}
                  className={styles.input}
                  id="email_form_booking"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  }
                  label="Email"
                />
                {emailValidate && (
                  <FormHelperText error={emailValidate} id="email_form_booking">
                    <FormattedMessage id="homePage.body.doctor.modal_booking.email-alert" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Địa chỉ */}
              <FormControl svariant="outlined" className={styles.form_control}>
                <InputLabel error={addressValidate} className={styles.label}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.location" />
                </InputLabel>
                <OutlinedInput
                  error={addressValidate}
                  className={styles.input}
                  id="location_form_booking"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <LocationOnIcon />
                    </InputAdornment>
                  }
                  label="address"
                />
                {addressValidate && (
                  <FormHelperText
                    error={addressValidate}
                    id="location_form_booking"
                  >
                    <FormattedMessage id="homePage.body.doctor.modal_booking.location-alert" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Lí do khám */}
              <FormControl svariant="outlined" className={styles.form_note}>
                <InputLabel className={styles.label}>
                  <FormattedMessage id="homePage.body.doctor.modal_booking.reason" />
                </InputLabel>
                <OutlinedInput
                  className={styles.input}
                  id="reason_form_booking"
                  type="textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <EditNoteIcon />
                    </InputAdornment>
                  }
                  label="reason booking"
                />
              </FormControl>
            </div>
            <div className={styles.submit_holder}>
              <Button className={styles.submit} onClick={handleSubmit}>
                <FormattedMessage id="homePage.body.doctor.modal_booking.submit" />
              </Button>
              <Button className={styles.cancel} onClick={handleCloseModal}>
                <FormattedMessage id="homePage.body.doctor.modal_booking.cancel" />
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={notification}
        autoHideDuration={3000}
        onClose={() => setNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification(false)}
          severity={err ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {err === true ? (
            <FormattedMessage id="homePage.body.doctor.modal_booking.Notify_err" />
          ) : (
            <FormattedMessage id="homePage.body.doctor.modal_booking.Notify" />
          )}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorRedux: state.system.doctor,
    genderRedux: state.system.gender,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
