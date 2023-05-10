import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
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
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { Link } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import bg from "../../assets/images/banner/bookingcare-cover-4.jpg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Loading from "../../components/Loading";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { CommonUtils, LANGUAGES, path } from "../../utils";
import avatarPreviewDemo from "../../assets/images/logo/avatar.png";
import { FormattedMessage } from "react-intl";

const SignUp = (props) => {
  const { loginOpen, handleCLoseLogin, language } = props;
  // email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [alert, setAlert] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validate
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [fullnameErr, setFullnameErr] = useState(false);
  const [phonenumberErr, setPhonenumberErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [genderErr, setGenderErr] = useState(false);

  // toast
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };
  const [openDialog, setOpenDialog] = useState(false);
  // validate
  let handleValidate = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email?.match(emailRegex)) {
      setEmailErr(false);
    } else if (!email?.match(emailRegex)) {
      setEmailErr(true);
      return false;
    }
    if (password?.length > 6) {
      setPasswordErr(false);
    } else if (password?.length < 6) {
      setPasswordErr(true);
      return false;
    }
    if (fullname) {
      setFullnameErr(false);
    } else if (!fullname) {
      setFullnameErr(true);
      return false;
    }
    if (phonenumber?.match("[0-9]{10}") && phonenumber.length === 10) {
      setPhonenumberErr(false);
    } else if (!phonenumber?.match("[0-9]{10}") && phonenumber.length !== 10) {
      setPhonenumberErr(true);
      return false;
    }
    if (address) {
      setAddressErr(false);
    } else if (!address) {
      setAddressErr(true);
      return false;
    }
    if (gender) {
      setGenderErr(false);
    } else if (!gender) {
      setGenderErr(true);
      return false;
    }
    return true;
  };
  useEffect(() => {
    props.getGenderStart();
  }, []);
  const genderArr = props.genderRedux;

  // xử lí sự kiện login
  const handleSignUpNewUser = async () => {
    let validate = handleValidate();
    setLoading(true);
    setErrMessage("");
    if (!validate) {
      setLoading(false);
      return;
    }
    try {
      let userData = await webService.handleSignUp({
        email,
        password,
        fullname,
        phonenumber,
        address,
        gender,
      });
      // Check các lỗi validation (Từ server)
      if (userData && userData.errCode === 1) {
        setLoading(false);
        setAlert(true);
        setErrMessage(
          language === LANGUAGES.VI
            ? "Hãy điền thông tin"
            : "Missing required parameter"
        );
      } else if (userData && userData.errCode === 3) {
        setLoading(false);
        setAlert(true);
        setErrMessage(
          language === LANGUAGES.VI
            ? "Email đã tồn tại"
            : "You use a exist Email"
        );
      } else if (userData && userData.errCode === 0) {
        setLoading(false);
        setOpenDialog(true);
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
  };
  // Show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAvatarPreview = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Chuyển đổi sang base64
      let base64 = await CommonUtils.getBase64(file);
      // Image creat thành 1 link url để preview Avatar
      let objectURL = URL.createObjectURL(file);
      setAvatarPreview(objectURL);
      setAvatar(base64);
    }
  };
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <FormattedMessage id="signup.success_title" />
        </DialogTitle>
        <DialogContent>
          <Alert severity="success">
            <FormattedMessage id="signup.success_body" />
          </Alert>
        </DialogContent>
        <DialogActions>
          <Link className={styles.btn_go_to_login} to={path.LOGIN}>
            <FormattedMessage id="Agree" />
          </Link>
        </DialogActions>
      </Dialog>
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
            {/* Avatar */}
            <div className={styles.avatar_holder}>
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
            </div>
            <Button
              startIcon={<PhotoCamera />}
              className={styles.btn_avatarPreview}
              component="label"
            >
              <FormattedMessage id="manager-user.image" />
              <input
                hidden
                id="image"
                name="image"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleAvatarPreview}
              />
            </Button>
            <h1 className={styles.title_signup}>
              <FormattedMessage id="signup.title" />
            </h1>
            <div className={styles.form_input}>
              {/* Email */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  error={emailErr}
                  id="email"
                  label={<FormattedMessage id="form.email" />}
                  name="email"
                  placeholder="Emal@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr && (
                  <FormHelperText error={emailErr} id="email_login_form">
                    <FormattedMessage id="form.email_err" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Password */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <InputLabel
                  error={passwordErr}
                  className={styles.label}
                  htmlFor="password"
                >
                  <FormattedMessage id="form.password" />
                </InputLabel>
                <OutlinedInput
                  error={passwordErr}
                  id="password"
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
                  <FormHelperText error={passwordErr} id="email_login_form">
                    <FormattedMessage id="form.password_err" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* Full name */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  error={fullnameErr}
                  id="fullname"
                  label={<FormattedMessage id="form.fullname" />}
                  name="fullname"
                  type="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                {fullnameErr && (
                  <FormHelperText error={fullnameErr} id="email_login_form">
                    <FormattedMessage id="form.fullname_err" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* phone number */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  error={phonenumberErr}
                  id="phonenumber"
                  label={<FormattedMessage id="form.phonenumber" />}
                  name="phonenumber"
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
                {phonenumberErr && (
                  <FormHelperText error={phonenumberErr} id="email_login_form">
                    <FormattedMessage id="form.phonenumber_err" />
                  </FormHelperText>
                )}
              </FormControl>
              {/* địa chỉ */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  error={addressErr}
                  id="address"
                  label={<FormattedMessage id="manager-user.address" />}
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {addressErr && (
                  <FormHelperText error={addressErr} id="email_login_form">
                    Vui lòng nhập địa chỉ
                  </FormHelperText>
                )}
              </FormControl>
              {/* Giới tính */}
              <FormControl className={styles.form_controller}>
                <InputLabel error={genderErr} id="gender">
                  <FormattedMessage id="manager-user.gender" />
                </InputLabel>
                <Select
                  error={genderErr}
                  labelId="gender"
                  id="gender"
                  value={gender}
                  label={<FormattedMessage id="form.gender" />}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((genders, index) => {
                      return (
                        <MenuItem key={index} value={genders.keyMap}>
                          {props.language === LANGUAGES.VI
                            ? genders.valueVI
                            : genders.valueEN}
                        </MenuItem>
                      );
                    })}
                </Select>
                {genderErr && (
                  <FormHelperText error={genderErr} id="email_login_form">
                    <FormattedMessage id="form.gender_err" />
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <Box className={styles.save_holder}>
              {/* Button submit */}
              <Button
                className={styles.save}
                onClick={handleSignUpNewUser}
                autoFocus
              >
                <FormattedMessage id="form.signup" />
              </Button>
              <p className={styles.or_login}>
                <FormattedMessage id="form.have_account" />
                <Link to={path.LOGIN} className={styles.login_btn}>
                  <FormattedMessage id="form.login" />
                </Link>
              </p>
              <p className={styles.terms}>
                <FormattedMessage id="form.term_p" />{" "}
                <button>
                  <FormattedMessage id="form.term_button" />
                </button>{" "}
                <FormattedMessage id="form.term_p2" />
              </p>
            </Box>
          </div>
        </Box>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.system.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
