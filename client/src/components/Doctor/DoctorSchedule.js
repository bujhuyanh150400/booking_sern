import { connect } from "react-redux";
import styles from "./DoctorSchedule.module.scss";
import * as actions from "../../store/actions";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LANGUAGES } from "../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import webService from "../../services/webService";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { FaRegHandPointUp } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import BookingModal from "./BookingModal";

const DoctorSchedule = (props) => {
  let { language, idDoctor, doctorRedux } = props;
  const [arrTime, setArrTime] = useState([]);
  const [avalableTime, setAvalableTime] = useState([]);
  const [dataScheduleModal, setDataScheduleModal] = useState();
  // set Modal đặt lịch khám
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (id) => {
    let data = avalableTime.find((item) => {
      return item.id === id;
    });
    setDataScheduleModal(data);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // fommat chọn ngày hẹn
  useEffect(() => {
    (async () => {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let object = {};
        if (language === LANGUAGES.VI) {
          if (i === 0) {
            let ddMM = moment(new Date()).format("DD/MM");
            let today = `Hôm nay - ${ddMM}`;
            object.label = today;
          } else {
            let LabelVI = moment(new Date())
              .add(i, "days")
              .format("dddd - DD/MM");
            object.label = LabelVI.charAt(0).toUpperCase() + LabelVI.slice(1);
          }
        } else if (language === LANGUAGES.EN) {
          if (i === 0) {
            let ddMM = moment(new Date()).format("DD/MM");
            let today = `Today - ${ddMM}`;
            object.label = today;
          } else {
            object.label = moment(new Date())
              .add(i, "days")
              .locale("en")
              .format("dddd - DD/MM");
          }
        }
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("day")
          .valueOf();
        arrDate.push(object);
      }
      setArrTime(arrDate);
    })();
  }, [language, idDoctor]);

  const handleOnChangeSelectDate = async (e) => {
    if (idDoctor) {
      let date = e.target.value;
      let res = await webService.getScheduleDoctorByDate(idDoctor, date);
      if (res && res.errCode === 0) {
        setAvalableTime(res.data);
      }
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.all_schedule}>
          <FormControl
            variant="outlined"
            className={styles.schedule_select_form}
          >
            <InputLabel id="select_day_schedules">Chọn lịch</InputLabel>
            <Select
              className={styles.schedule_select}
              labelId="select_day_schedules"
              label="Chọn lịch"
              onChange={(e) => handleOnChangeSelectDate(e)}
            >
              {arrTime &&
                arrTime.length > 0 &&
                arrTime.map((time, index) => {
                  return (
                    <MenuItem value={time.value} key={index}>
                      {time.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.all_available_time}>
          <div className={styles.text_calendar}>
            <span className={styles.span_calendar}>
              <BsFillCalendarWeekFill />
              <FormattedMessage id="homePage.body.doctor.detail-doctor.calendar" />
            </span>
          </div>
          <div className={styles.avalable_time}>
            {avalableTime && avalableTime.length > 0 ? (
              avalableTime.map((item, index) => {
                let timeDisplay =
                  language === LANGUAGES.VI
                    ? item.timeTypeData.valueVI
                    : item.timeTypeData.valueEN;
                return (
                  <Button
                    key={index}
                    className={styles.avalable_time_btn}
                    onClick={() => handleOpenModal(item.id)}
                  >
                    {timeDisplay}
                  </Button>
                );
              })
            ) : (
              <span className={styles.no_time}>
                <FormattedMessage id="homePage.body.doctor.detail-doctor.no-time" />
              </span>
            )}
          </div>
          <div className={styles.free}>
            <FaRegHandPointUp />
            <FormattedMessage id="homePage.body.doctor.detail-doctor.free" />
          </div>
        </div>
      </div>
      <BookingModal
        openModal={openModal}
        idDoctor={idDoctor}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        data={doctorRedux}
        doctorRedux={doctorRedux}
        dataScheduleModal={dataScheduleModal}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
