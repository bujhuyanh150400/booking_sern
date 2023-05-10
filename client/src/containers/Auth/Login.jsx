import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { webService } from "../../services";
import Box from "@mui/material/Box";
import {
  Alert,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import bg from "../../assets/images/banner/bookingcare-cover-4.jpg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Loading from "../../components/Loading";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { LANGUAGES, path } from "../../utils";
import { FormattedMessage } from "react-intl";

const Login = (props) => {
  const { loginOpen, handleCLoseLogin, userLoginSuccess, language } = props;
  // email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alert, setAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // toast
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };
  // validate
  let handleValidate = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegex)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
    if (password.length > 6) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  };
  useEffect(() => {}, [emailErr, passwordErr]);
  // xử lí sự kiện login
  const handleLogin = async () => {
    handleValidate();
    setLoading(true);
    setErrMessage("");
    // Trường hợp chưa nhập input
    if (emailErr && passwordErr) {
      setLoading(false);
    }
    // Submit
    else if (!emailErr && !passwordErr) {
      try {
        let userData = await webService.handleLogin(email, password);
        // Check các lỗi validation (Từ server)
        if (userData && userData.errCode === 2) {
          setLoading(false);
          setAlert(true);
          setErrMessage(
            language === LANGUAGES.VI
              ? "Không tìm thấy người dùng"
              : "User is not found in Server"
          );
        } else if (userData && userData.errCode === 3) {
          setLoading(false);
          setAlert(true);
          setErrMessage(
            language === LANGUAGES.VI ? "Sai mật khẩu" : "Wrong password"
          );
        } else if (userData && userData.errCode === 1) {
          setLoading(false);
          setAlert(true);
          setErrMessage(
            language === LANGUAGES.VI
              ? "Email của bạn không tồn tại"
              : "Your's Email isn't exist in Database"
          );
        } else if (userData && userData.errCode === 0) {
          userLoginSuccess(userData.user);
          handleCLoseLogin();
        }
        // Check các lỗi validator
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            setLoading(false);
            setAlert(true);
            setErrMessage(
              language === LANGUAGES.VI
                ? "Lỗi bên phía Server"
                : "Error in Server"
            );
          }
        }
      }
    }
  };
  // Show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
      {loading && <Loading />}
      <div className={styles.background}>
        <Box className={styles.body}>
          <div className={styles.content}>
            <div className={styles.left_body}>
              {/* <img src={bg} alt="bg" /> */}
            </div>
            <div className={styles.right_body}>
              <div className={styles.header}>
                <h1 className={styles.title}>
                  Booking<span>Care</span>
                </h1>
                <div className={styles.param}>
                  <p>
                    <FormattedMessage id="login.p1" />
                    <span>
                      <FormattedMessage id="login.login" />
                    </span>
                  </p>
                  <p>
                    <FormattedMessage id="login.p2" />
                  </p>
                </div>
              </div>

              <div className={styles.form_login}>
                {/* Email */}
                <FormControl
                  svariant="outlined"
                  className={styles.form_control}
                >
                  <InputLabel
                    error={emailErr}
                    className={styles.label}
                    htmlFor="email_login_form"
                  >
                    <FormattedMessage id="login.username" />
                  </InputLabel>
                  <OutlinedInput
                    error={emailErr}
                    className={styles.input}
                    id="email_login_form"
                    type="email"
                    placeholder="Example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    label="ur uesrname"
                  />
                  {emailErr && (
                    <FormHelperText error={emailErr} id="email_login_form">
                      <FormattedMessage id="login.username_err" />
                    </FormHelperText>
                  )}
                </FormControl>
                {/* password */}
                <FormControl variant="outlined" className={styles.form_control}>
                  <InputLabel
                    error={passwordErr}
                    className={styles.label}
                    htmlFor="password_login_form"
                  >
                    <FormattedMessage id="login.password" />
                  </InputLabel>
                  <OutlinedInput
                    error={passwordErr}
                    id="password_login_form"
                    className={styles.input}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {passwordErr && (
                    <FormHelperText error id="password_login_form">
                      <FormattedMessage id="login.password_err" />
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className={styles.submit_holder}>
                <Button className={styles.submit} onClick={handleLogin}>
                  <FormattedMessage id="login.login" />
                </Button>
                <Link to={path.SIGNUP} className={styles.signup}>
                  <FormattedMessage id="login.signup" />
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
