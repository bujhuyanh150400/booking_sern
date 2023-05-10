import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "../containers/Header/System";
import { path } from "../utils";
import { Box } from "@mui/material";
import LadingPageHome from "../containers/System/LadingPageHome";
import EditUser from "../containers/System/EditUser";
import BookingForPatient from "../containers/System/Patient/BookingForPatient";

// Menu
const Patient = (props) => {
  const { isLoggedIn } = props;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Header */}
        {isLoggedIn && <Header />}
        <Switch>
          <Route path={path.HOMEPAGE_PATIENT} component={LadingPageHome} />

          <Route path={path.EDIT_INFO_PATIENT} component={EditUser} />
          <Route path={path.BOOKING_FOR_PATIENT} component={BookingForPatient} />

          <Route
            component={() => {
              return <Redirect to={path.HOMEPAGE_PATIENT} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
