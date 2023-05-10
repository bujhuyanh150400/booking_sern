import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";
// Routes
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage";
import Doctor from "../routes/Doctor";
import VerifyEmail from "../components/VerifyEmail";
import DetailDoctor from "./Doctor/DetailDoctor";
import DetailSpecialty from "./Specialty/DetailSpecialty";
import DetailClinic from "./Clinic/DetailClinic";
import DataSpecialty from "./Specialty/DataSpecialty";
import DataClinic from "./Clinic/DataClinic";
import DataDoctor from "./Doctor/DataDoctor";
import SignUp from "./Auth/SignUp";
import Patient from "../routes/Patient";
import NoResponsive from "../components/NoResponsive"
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <>
        <Router history={history}>
          <NoResponsive />
          <div className="main-container">
            <span className="content-container">
              <Switch>
                {/* System */}
                <Route path={path.HOME} exact component={Home} />
                <Route path={path.HOMEPAGE} component={HomePage} />
                {/* Login & SignUp */}
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route path={path.SIGNUP} component={SignUp} />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route
                  path={path.DOCTOR}
                  component={userIsAuthenticated(Doctor)}
                />
                  <Route
                  path={path.PATIENT}
                  component={userIsAuthenticated(Patient)}
                />
                {/* Detail */}
                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                {/* List */}
                <Route path={path.LIST_SPECIALTY} component={DataSpecialty} />
                <Route path={path.LIST_CLINIC} component={DataClinic} />
                <Route path={path.LIST_DOCTOR} component={DataDoctor} />

                {/* Verify email */}
                <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
              </Switch>
            </span>
          </div>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
