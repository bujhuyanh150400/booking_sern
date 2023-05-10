import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import styles from "./ManagerHistoryBooking.module.scss";
import { FcCalendar } from "react-icons/fc";
import { Button, Alert } from "@mui/material";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import TableData from "../../../components/TableData";
const ManagerHistoryBooking = (props) => {
  let { user, fetchBookingDoneForDoctorRedux, listBookingDone } = props;
  const [currentDate, setCurrentDate] = useState();
  useEffect(() => {
    fetchBookingDoneForDoctorRedux(user.id, currentDate);
  }, [currentDate, user]);
  let data = listBookingDone;
  //-- Xử lí date picker
  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(new Date(date[0]).getTime());
  };
  // Cột của bảng
  const column = [
    {
      name: <FormattedMessage id="table.date" />,
      value: "date",
    },
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
      name: <FormattedMessage id="table.reason" />,
      value: "reason",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>
          <FormattedMessage id="Doctor.ManagerHistoryBooking.title" />
        </h1>
        <div className={styles.body}>
          {/* chọn ngày */}
          <div className={styles.select_day}>
            <h2 className={styles.select_day_title}>
              <FormattedMessage id="manager-schedule.select-day" />
            </h2>
            <div className={styles.select_day_container}>
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
              <Button
                className={styles.button_select_all}
                onClick={() => setCurrentDate("ALL")}
              >
                <FormattedMessage id="Doctor.ManagerHistoryBooking.all" />
              </Button>
            </div>
          </div>
          {/* Bảng dữ liệu */}
          <TableData columnData={column} data={data} forAnotherData={true} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
    listBookingDone: state.system.listBookingDone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookingDoneForDoctorRedux: (doctorId, date) =>
      dispatch(actions.fetchBookingDoneForDoctorStart(doctorId, date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerHistoryBooking);
