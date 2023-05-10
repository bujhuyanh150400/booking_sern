import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import styles from "./EditUser.module.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../utils";
import * as actions from "../../store/actions";
import avatarPreviewDemo from "../../assets/images/logo/avatar.png";
import Loading from "../../components/Loading";
import {
  Button,
  Box,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Card } from "reactstrap";
import { ToolTipCustom } from "../../components/CustomMui";

const EditUser = (props) => {
  // -- Các biến state
  // Loading
  const [loading, setLoading] = useState(false);

  // Avatar Preview
  const [avatarPreview, setAvatarPreview] = useState("");

  // State thông tin
  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  // State validate
  const [isValid, setIsValid] = useState(false);
  // Pop modal success và tooltips
  const [popupCreate, setPopupCreate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Action
  const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
  // -- useEffect được dùng để update components
  useEffect(() => {
    props.getGenderStart();
    props.getPositionStart();
    props.getRoleStart();
    props.fetchUserByIdRedux(props.userInfo.id);
  }, []);
  // Đặt biến để khi render từ useEffect sẽ truyền luôn sang option
  const genderArr = props.genderRedux;
  const positionArr = props.positionRedux;
  const roleArr = props.roleRedux;
  const user = props.dataUser;
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPassword("HARDCODE");
      setFullname(user.fullname);
      setPhonenumber(user.phonenumber);
      setAddress(user.address);
      setGender(user.gender);
      setPosition(user.positionId);
      setRole(user.roleId);
      setAction(CRUD_ACTIONS.EDIT);
      setIdUser(user.id);
      if (user.image) {
        setAvatarPreview(new Buffer(user.image, "base64").toString("binary"));
      }
    }
  }, [user]);

  //-- Xử lí validate
  useEffect(() => {
    if (
      phonenumber?.match("[0-9]{10}") &&
      phonenumber.length === 10 &&
      fullname &&
      address &&
      gender &&
      role
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [phonenumber, fullname, address, gender, role, isValid]);

  //-- Xử lí onChange AvatarPreview
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

  // -- Xử lí edit user
  // -- xử lí lưu người dùng
  const handleSaveUser = () => {
    props.editEditUser({
      id: idUser,
      fullname,
      address,
      phonenumber,
      roleId: role,
      positionId: position,
      gender,
      avatar,
    });
    setPopupCreate(true);
  };
  // Show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {/* Loading */}
      {loading && <Loading />}
      {/* Container */}
      <div className={styles.container}>
        {/* header */}
        <h1 className={styles.header}>
          <FormattedMessage id="manager-user.title" />
        </h1>
        <div className={styles.body}>
          <div className={styles.form}>
            {/* Avatar */}
            <div className={styles.form_header_holder}>
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
                <label className={styles.label_avatarPreview} for="image">
                  <FormattedMessage id="manager-user.image" />
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleAvatarPreview}
                  hidden
                />
              </div>
              <Card className={styles.alert_card}>
                <CardContent className={styles.alert_holder}>
                  <h3 className={styles.alert_title}>
                    <FormattedMessage id="manager-user.validate" />
                  </h3>
                  <p className={styles.alert}>
                    - <FormattedMessage id="manager-user.alert_email" />
                  </p>
                  <p className={styles.alert}>
                    - <FormattedMessage id="manager-user.alert_password" />
                  </p>
                  <p className={styles.alert}>
                    - <FormattedMessage id="manager-user.alert_phonenumber" />
                  </p>
                  <p className={styles.alert}>
                    - <FormattedMessage id="manager-user.alert" />
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* Form input */}
            <div className={styles.form_input}>
              {/* Email */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="email"
                  label={<FormattedMessage id="manager-user.email" />}
                  name="email"
                  placeholder="Emal@email.com"
                  type="email"
                  value={email}
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              {/* Password */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <InputLabel className={styles.label} htmlFor="password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={action === CRUD_ACTIONS.EDIT ? true : false}
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
              </FormControl>
              {/* Full name */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="fullname"
                  label={<FormattedMessage id="manager-user.fullname" />}
                  name="fullname"
                  type="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </FormControl>
              {/* phone number */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="phonenumber"
                  label={<FormattedMessage id="manager-user.phonenumber" />}
                  name="phonenumber"
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </FormControl>
              {/* address */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="address"
                  label={<FormattedMessage id="manager-user.address" />}
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              {/* Giới tính */}
              <FormControl className={styles.form_controller}>
                <InputLabel id="gender">
                  <FormattedMessage id="manager-user.gender" />
                </InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={gender}
                  label="gender"
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
              </FormControl>
              {user.roleId === "R3" ? (
                <></>
              ) : (
                <>
                  {/* Vị trí */}
                  <FormControl className={styles.form_controller}>
                    <InputLabel id="position">
                      <FormattedMessage id="manager-user.positionId" />
                    </InputLabel>
                    <Select
                      labelId="position"
                      id="position"
                      value={position}
                      label="position"
                      q
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((positions, index) => {
                          return (
                            <MenuItem key={index} value={positions.keyMap}>
                              {props.language === LANGUAGES.VI
                                ? positions.valueVI
                                : positions.valueEN}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  {/* Role */}
                  <FormControl className={styles.form_controller}>
                    <InputLabel id="role">
                      <FormattedMessage id="manager-user.roleId" />
                    </InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      value={role}
                      label="role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.map((roles, index) => {
                          return (
                            <MenuItem key={index} value={roles.keyMap}>
                              {props.language === LANGUAGES.VI
                                ? roles.valueVI
                                : roles.valueEN}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </>
              )}
            </div>
          </div>
          {/* Save btn */}
          <Box className={styles.save_holder}>
            {/* Button submit */}
            {isValid ? (
              <Button className={styles.save} onClick={handleSaveUser}>
                {action === CRUD_ACTIONS.EDIT ? (
                  <FormattedMessage id="manager-user.save" />
                ) : (
                  <FormattedMessage id="manager-user.add" />
                )}
              </Button>
            ) : (
              <>
                <ToolTipCustom
                  placement="left"
                  title={<FormattedMessage id="manager-user.tooltip" />}
                >
                  <Button className={styles.save_unactive}>
                    <FormattedMessage id="manager-user.add" />
                  </Button>
                </ToolTipCustom>
              </>
            )}
          </Box>
        </div>
      </div>
      {/*  pop up khi tạo & lưu thành công */}
      <Snackbar
        open={popupCreate}
        autoHideDuration={3000}
        onClose={() => setPopupCreate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupCreate(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <FormattedMessage id="manager-user.success" />
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.system.gender,
    positionRedux: state.system.position,
    roleRedux: state.system.roles,
    isLoading: state.system.isLoading,
    dataUser: state.system.dataUser,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    editEditUser: (data) => dispatch(actions.EditUserStart(data)),
    fetchUserByIdRedux: (id) => dispatch(actions.fetchUserByIdStart(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
