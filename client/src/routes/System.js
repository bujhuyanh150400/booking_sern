import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManagerDoctor from "../containers/System/Admin/ManagerDoctor";

import Header from "../containers/Header/System";
import ManagerSpecialty from "../containers/System/Specialty/ManagerSpecialty";
import ManagerClinic from "../containers/System/Clinic/ManagerClinic";
import { path } from "../utils";
import Box from "@mui/material/Box";
import ManageSchedules from "../containers/System/Doctor/ManageSchedules";
import LadingPageHome from "../containers/System/LadingPageHome";

// Menu
const System = (props) => {
  const { isLoggedIn } = props;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Header */}
        {isLoggedIn && <Header />}
        <Switch>
          <Route path={path.HOMEPAGE_SYSTEM} component={LadingPageHome} />
          <Route path={path.MANAGER_DOCTOR} component={ManagerDoctor} />
          <Route path={path.USER_REDUX} component={UserRedux} />
          <Route path={path.MANAGER_SPECIALTY} component={ManagerSpecialty} />
          <Route path={path.MANAGER_CLINIC} component={ManagerClinic} />
          <Route path={path.MANAGER_SCHEDULE} component={ManageSchedules} />
          <Route
            component={() => {
              return <Redirect to={path.HOMEPAGE_SYSTEM} />;
            }}
          />
        </Switch>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
