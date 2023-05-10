import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./ManageSchedulesForDoctor.module.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { FcCalendar } from "react-icons/fc";
import { LANGUAGES, DATE_FOMAT } from "../../../utils";
import clsx from "clsx";
import webService from "../../../services/webService";
import moment from "moment";
import { Button, Snackbar, Alert } from "@mui/material";
import _ from "lodash";
// Menu
const ManageSchedulesForDoctor = (props) => {
  // -- Các biến state
  const [currentDate, setCurrentDate] = useState("");
  const [timeRedux, setTimeRedux] = useState([]);
  const [alert, setAlert] = useState("");
  const [failed, setFailed] = useState(false);
  const [popupAlert, setPopupAlert] = useState(false);

  let result = [];

  // -- props
  const {
    doctorsRedux,
    timeDataRedux,
    language,
    user,
  } = props;

  // -- xử lí lấy thông tin lấy dữ liệu doctors và time
  useEffect(() => {
    props.fetchScheduleTimesRedux();
  }, []);
  let doctors = doctorsRedux;
  let selectDoctor = user.id;
  //-- Xử lí date picker
  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  // -- Xử lí chọn time

  useEffect(() => {
    if (timeDataRedux && timeDataRedux.length > 0) {
      timeDataRedux.map((time) => {
        time.isActive = false;
      });
    }
    setTimeRedux(timeDataRedux);
  }, [timeDataRedux]);
  const handleClickTime = (time) => {
    setTimeRedux((state) =>
      state.map((item) => {
        if (item.id === time.id) {
          if (item.isActive === true) {
            item.isActive = false;
          } else {
            item.isActive = true;
          }
        }
        return item;
      })
    );
  };
  // -- xử lí save lịch
  const handleSaveSchedule = async () => {
    let fomattedDate = new Date(currentDate).getTime();
    // Validate
    if (!currentDate) {
      language === LANGUAGES.VI
        ? setAlert("Bạn chưa điền ngày")
        : setAlert("Choose a date");
      setPopupAlert(true);
      setFailed(true);
    } else if (!selectDoctor && _.isEmpty(selectDoctor)) {
      language === LANGUAGES.VI
        ? setAlert("Bạn chưa chọn bác sĩ")
        : setAlert("Choose a doctor");
      setPopupAlert(true);
      setFailed(true);
    } else if (timeRedux && timeRedux.length > 0) {
      let selectedTime = timeRedux.filter((time) => {
        return time.isActive === true;
      });
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = selectDoctor;
          object.date = fomattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
        let respone = await webService.saveBulkScheduleDoctor({
          arrSchedules: result,
          doctorId: selectDoctor,
          fomattedDate: fomattedDate,
        });
        if (respone && respone.errCode === 0) {
          language === LANGUAGES.VI
            ? setAlert("Đã tạo thành công")
            : setAlert("Create schedule successfully");
          setPopupAlert(true);
          setFailed(false);
        } else {
          language === LANGUAGES.VI
            ? setAlert("Đã kín lịch")
            : setAlert("Full schedule");
          setPopupAlert(true);
          setFailed(true);
        }
        timeDataRedux.map((time) => {
          time.isActive = false;
        });
        setCurrentDate("");
      } else {
        language === LANGUAGES.VI
          ? setAlert("Hãy chọn ít nhất 1 giờ khám")
          : setAlert("Please choose at least one clinic time");
        setPopupAlert(true);
        setFailed(true);
      }
    }
  };

  return (
    <>
      <Snackbar
        open={popupAlert}
        autoHideDuration={3000}
        onClose={() => setPopupAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupAlert(false)}
          severity={failed ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alert}
        </Alert>
      </Snackbar>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="manager-schedule.title" />
        </h1>
        <div className={styles.body}>
          <div className={styles.select_schedule_container}>
            {/* Trái */}
            <div className={styles.left_holder}>
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
                    minDate={yesterday}
                    value={currentDate}
                    placeholder="DD/MM/YYYY"
                    className={styles.input_day}
                  />
                </div>
              </div>
            </div>
            {/* Phải */}
            <div className={styles.right_holder}>
              <h2 className={styles.select_time_title}>
                <FormattedMessage id="manager-schedule.select-time" />
              </h2>
              <div className={styles.select_time_holder}>
                {timeRedux &&
                  timeRedux.length > 0 &&
                  timeRedux.map((time, index) => {
                    return (
                      <div className={styles.time_box} key={index}>
                        <Button
                          onClick={() => {
                            handleClickTime(time);
                          }}
                          className={clsx(
                            styles.time_btn,
                            time.isActive && styles.active
                          )}
                        >
                          {language === LANGUAGES.VI
                            ? time?.valueVI
                            : time?.valueEN}
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={styles.submit}>
              <Button
                className={styles.submit_btn}
                onClick={handleSaveSchedule}
              >
                <FormattedMessage id="manager-schedule.save" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    timeDataRedux: state.system.timeData,
    user: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleTimesRedux: () => dispatch(actions.fetchScheduleTimesStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSchedulesForDoctor);
