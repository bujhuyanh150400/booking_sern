import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "../containers/Header/System";
import ManageSchedules from "../containers/System/Doctor/ManageSchedules";
import { path } from "../utils";
import { Box } from "@mui/material";
import ManageSchedulePatient from "../containers/System/Doctor/ManageSchedulePatient";
import ManageSchedulesForDoctor from "../containers/System/Doctor/ManageSchedulesForDoctor";
import LadingPageHome from "../containers/System/LadingPageHome";
import EditUser from "../containers/System/EditUser";
import ManagerHistoryBooking from "../containers/System/Doctor/ManagerHistoryBooking";
import InfoDoctor from "../containers/System/Doctor/InfoDoctor";

// Menu
const Doctor = (props) => {
  const { systemMenuPath, isLoggedIn } = props;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Header */}
        {isLoggedIn && <Header />}
        <Switch>
          <Route path={path.HOMEPAGE_DOCTOR} component={LadingPageHome} />
          <Route
            path={path.MANAGER_PATIENT_SCHEDULE}
            component={ManageSchedulePatient}
          />
          <Route
            path={path.EDIT_INFO_DOCTOR}
            component={EditUser}
          />
          <Route
            path={path.MANAGER_SCHEDULE_FOR_DOCTOR}
            component={ManageSchedulesForDoctor}
          />
          <Route
            path={path.HISTORY_BOOKING}
            component={ManagerHistoryBooking}
          />
          <Route
            path={path.EDIT_INFO_DETAIL_DOCTOR}
            component={InfoDoctor}
          />
          <Route
            component={() => {
              return <Redirect to={path.HOMEPAGE_DOCTOR} />;
            }}
          />
        </Switch>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
