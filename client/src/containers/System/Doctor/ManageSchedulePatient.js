import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import styles from "./ManageSchedulePatient.module.scss";
import { FcCalendar } from "react-icons/fc";
import { LANGUAGES, DATE_FOMAT, CommonUtils } from "../../../utils";
import clsx from "clsx";
import moment from "moment";
import {
  Button,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextareaAutosize,
} from "@mui/material";
import _ from "lodash";
import avatarPreviewDemo from "../../../assets/images/logo/demo_speciality.png";
import DatePicker from "../../../components/Input/DatePicker";
import TableData from "../../../components/TableData";
import SendIcon from "@mui/icons-material/Send";
import webService from "../../../services/webService";
import Loading from "../../../components/Loading";

const ManageSchedulePatient = (props) => {
  let { user, fetchListPatientForDoctorRedux, listBooking, language } = props;
  const [currentDate, setCurrentDate] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [popupCreate, setPopupCreate] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reReder, setReRender] = useState(1);
  let date = new Date(currentDate).getTime();
  useEffect(() => {
    fetchListPatientForDoctorRedux(user.id, date);
  }, [currentDate, user, date, fetchListPatientForDoctorRedux, reReder]);
  let data = listBooking;
  //-- Xử lí date picker
  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };
  const handleConfirm = (item) => {
    setOpenDialog(true);
    setDataModal(item);
  };
  // Cột của bảng
  const column = [
    {
      name: <FormattedMessage id="table.time" />,
      value: "timeTypeBookingData",
    },
    {
      name: <FormattedMessage id="table.name" />,
      value: "patientData",
      valueChild: "fullname",
    },
    {
      name: <FormattedMessage id="table.address" />,
      value: "patientData",
      valueChild: "address",
    },
    {
      name: <FormattedMessage id="table.phonenumber" />,
      value: "patientData",
      valueChild: "phonenumber",
    },
    {
      name: <FormattedMessage id="table.email" />,
      value: "patientData",
      valueChild: "email",
    },
    {
      name: <FormattedMessage id="table.gender" />,
      value: "patientData",
      valueChild: "genderData",
    },
    {
      name: <FormattedMessage id="table.action" />,
      value: "confirmsend",
    },
  ];
  return (
    <>
      {loading && <Loading />}
      <Snackbar
        open={popupCreate}
        autoHideDuration={3000}
        onClose={() => setPopupCreate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupCreate(false)}
          severity={failed ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {failed === true
            ? "Đã gửi xác nhận thất bại "
            : "Đã gửi xác nhận thành công"}
        </Alert>
      </Snackbar>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="menu.Doctor_role.manager-patient.title" />
        </h1>
        <div className={styles.body}>
          {/* chọn ngày */}
          <div className={styles.select_day}>
            <h2 className={styles.select_day_title}>
              <FormattedMessage id="manager-schedule.select-day" />
            </h2>
            <div className={styles.select_day_holder}>
              <div className={styles.select_day_icon}>
                <FcCalendar />
              </div>
              <DatePicker
                onChange={handleOnChangeDatePicker}
                value={currentDate}
                placeholder="DD/MM/YYYY"
                className={styles.input_day}
              />
            </div>
          </div>
          {/* Bảng dữ liệu */}
          <TableData
            columnData={column}
            data={data}
            forAnotherData={true}
            handleConfirm={handleConfirm}
          />
        </div>
      </div>
      <ModalConfirm
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        dataModal={dataModal}
        language={language}
        setPopupCreate={setPopupCreate}
        setFailed={setFailed}
        setLoading={setLoading}
        setReRender={setReRender}
      />
    </>
  );
};
// Modal
const ModalConfirm = (props) => {
  let {
    openDialog,
    setOpenDialog,
    dataModal,
    language,
    setPopupCreate,
    setFailed,
    setLoading,
    setReRender,
  } = props;
  // const [email, setEmail] = useState(dataModal?.patientData?.email);
  const [image, setImage] = useState("");
  const [note, setNote] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  //-- Xử lí onChange AvatarPreview
  const handleAvatarPreview = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Chuyển đổi sang base64
      let base64 = await CommonUtils.getBase64(file);
      // Image creat thành 1 link url để preview Avatar
      let objectURL = URL.createObjectURL(file);
      setAvatarPreview(objectURL);
      setImage(base64);
    }
  };
  const handleSendRemedy = async () => {
    setLoading(true);
    let res = await webService.postSendRemedy({
      doctorId: dataModal?.doctorId,
      patientId: dataModal?.patientId,
      email: dataModal?.patientData?.email,
      fullname: dataModal?.patientData?.fullname,
      phonenumber: dataModal?.patientData?.phonenumber,
      gender: dataModal?.patientData?.gender,
      address: dataModal?.patientData?.address,
      timeType: dataModal?.timeType,
      language,
      image,
      note,
    });
    if (res && res.errCode === 0) {
      setLoading(false);
      setFailed(false);
      setPopupCreate(true);
      setReRender((prev) => prev + 1);
      setOpenDialog(false);
    } else {
      setLoading(false);
      setFailed(true);
      setPopupCreate(true);
    }
  };
  return (
    <Dialog fullScreen open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>
        <FormattedMessage id="Doctor.ManagerHistoryBooking.confirm_title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className={styles.dialog}>
            <div className={styles.dialog_info}>
              <h2 className={styles.info_title}>
                <FormattedMessage id="Doctor.ManagerHistoryBooking.info_title" />
              </h2>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="form.fullname" />:{" "}
                </span>
                {dataModal?.patientData?.fullname}
              </p>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="form.address" />:{" "}
                </span>
                {dataModal?.patientData?.address}
              </p>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="form.gender" />:{" "}
                </span>
                {language === LANGUAGES.VI
                  ? dataModal?.patientData?.genderData?.valueVI
                  : dataModal?.patientData?.genderData?.valueEN}
              </p>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="form.email" />:{" "}
                </span>
                {dataModal?.patientData?.email}
              </p>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="form.phonenumber" />:{" "}
                </span>
                {dataModal?.patientData?.phonenumber}
              </p>
              <p className={styles.info_holder}>
                <span>
                  <FormattedMessage id="table.reason" />:{" "}
                </span>
                {dataModal?.reason}
              </p>
            </div>
            <div className={styles.bottom_holder}>
              <div className={styles.note_doctor}>
                <h2 className={styles.note_doctor_title}>
                  <FormattedMessage id="Doctor.ManagerHistoryBooking.note" />
                </h2>
                <TextareaAutosize
                  className={styles.textarea}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  minRows={8}
                />
              </div>
              <div className={styles.avatar_holder}>
                <h2 className={styles.title_avatar}>
                  <FormattedMessage id="Doctor.ManagerHistoryBooking.image" />
                </h2>
                {avatarPreview === "" ? (
                  <div
                    className={styles.preview_avatarPreview}
                    style={{
                      backgroundImage: `url(${avatarPreviewDemo})`,
                    }}
                  ></div>
                ) : (
                  <div
                    className={styles.preview_avatarPreview}
                    style={{
                      backgroundImage: `url(${avatarPreview})`,
                    }}
                  ></div>
                )}
                <Button
                  variant="contained"
                  component="label"
                  className={styles.label_avatarPreview}
                >
                  <FormattedMessage id="menu.Admin_role.manager-specialty.image_upload" />
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleAvatarPreview}
                    hidden
                  />
                </Button>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setOpenDialog(false)}
        >
          <FormattedMessage id="close" />
        </Button>
        <Button
          startIcon={<SendIcon />}
          color="success"
          variant="outlined"
          onClick={handleSendRemedy}
          autoFocus
        >
          <FormattedMessage id="Agree" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
    language: state.app.language,
    listBooking: state.system.listBooking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListPatientForDoctorRedux: (doctorId, date) =>
      dispatch(actions.fetchListPatientForDoctorStart(doctorId, date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSchedulePatient);
