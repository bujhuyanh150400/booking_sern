import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import styles from "./BookingForPatient.module.scss";
import _ from "lodash";
import TableData from "../../../components/TableData";
import webService from "../../../services/webService";
const BookingForPatient = (props) => {
  let { user } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await webService.getListBookingDoneForPatient(user.id);
      if (res && res.errCode === 0) {
        setData(res.data);
      }
    })();
  }, [user]);
  // Cột của bảng
  const column = [
    {
      name: <FormattedMessage id="table.name" />,
      value: "date",
    },
    {
      name: <FormattedMessage id="table.time" />,
      value: "timeTypeBookingData",
    },
    {
      name: <FormattedMessage id="table.status" />,
      value: "statusData",
    },
    {
      name: <FormattedMessage id="table.address" />,
      value: "patientData",
      valueChild: "address",
    },
    {
      name: <FormattedMessage id="table.reason" />,
      value: "reason",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}><FormattedMessage id="Doctor.ManagerHistoryBooking.title" /></h1>
        <div className={styles.body}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingForPatient);
