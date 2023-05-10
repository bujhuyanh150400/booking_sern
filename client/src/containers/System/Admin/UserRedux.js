import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import styles from "./UserRedux.module.scss";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import avatarPreviewDemo from "../../../assets/images/logo/avatar.png";
import TableManagerUser from "./TableManagerUser";
import Loading from "../../../components/Loading";
import {
  Modal,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Card } from "reactstrap";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { ToolTipCustom } from "../../../components/CustomMui";

const UserRedux = (props) => {
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
  const [popupDelete, setPopupDelete] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleOpenDeleteUser = () => setOpenDeleteUser(true);
  const handleOpenCreateUser = () => setOpenCreateUser(true);
  const handleCloseCreateUser = () => setOpenCreateUser(false);
  // Action
  const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
  // -- useEffect được dùng để update components
  useEffect(() => {
    props.getGenderStart();
    props.getPositionStart();
    props.getRoleStart();
  }, []);

  // Đặt biến để khi render từ useEffect sẽ truyền luôn sang option
  const genderArr = props.genderRedux;
  const positionArr = props.positionRedux;
  const roleArr = props.roleRedux;

  //-- Xử lí validate
  useEffect(() => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      email.match(emailRegex) &&
      password.length > 6 &&
      phonenumber.match("[0-9]{10}") &&
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
  }, [email, password, phonenumber, fullname, address, gender, role, isValid]);

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
  //-- Xử lí save user
  // Clear input khi add user
  const handleClearInput = () => {
    setEmail("");
    setPassword("");
    setFullname("");
    setPhonenumber("");
    setAddress("");
    setGender("");
    setPosition("");
    setRole("");
    setAvatarPreview("");
  };
  // -- Xử lí edit user
  const handleEditUserFromParent = (user) => {
    setEmail(user.email);
    setPassword("HARDCODE");
    setFullname(user.fullname);
    setPhonenumber(user.phonenumber);
    setAddress(user.address);
    setGender(user.gender);
    setPosition(user.positionId);
    setRole(user.roleId);
    setAvatarPreview(user.image);
    setAction(CRUD_ACTIONS.EDIT);
    setIdUser(user.id);
  };
  // -- Xử lí delete user
  useEffect(() => {
  }, [props.resDeleteUser]);
  const handleDeleteUser = () => {
    setLoading(true);
    props.deleteUserRedux(idUser);
    setOpenDeleteUser(false);
    if (props.resDeleteUser === 0) {
      setLoading(false);
      setPopupDelete(true);
    } else {
      setLoading(false);
      setPopupDelete(true);
    }
  };
  // -- xử lí lưu người dùng
  const handleSaveUser = () => {
    if (action === CRUD_ACTIONS.CREATE) {
      props.createNewUser({
        fullname,
        password,
        email,
        address,
        phonenumber,
        gender,
        role,
        position,
        avatar,
      });
      setPopupCreate(true);
      handleClearInput();
    }
    if (action === CRUD_ACTIONS.EDIT) {
      props.editUserRedux({
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
    }
    // Upload new user lên table
    props.fetchUsersRedux();
  };
  // Show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {/* Loading */}
      {loading === true && (
        <>
          <Loading />
        </>
      )}
      {/* Container */}
      <div className={styles.container}>
        {/* header */}
        <h1 className={styles.header}>
          <FormattedMessage id="manager-user.title" />
        </h1>
        <div className={styles.body}>
          <Button
            className={styles.add_user}
            onClick={() => {
              handleOpenCreateUser();
              handleClearInput();
            }}
          >
            <FormattedMessage id="manager-user.add" />
          </Button>
          {/* Bảng người dùng */}
          <TableManagerUser
            handleEditUserFromParent={handleEditUserFromParent}
            handleOpenDeleteUser={handleOpenDeleteUser}
            action={action}
            handleOpenCreateUser={handleOpenCreateUser}
            setIdUser={setIdUser}
          />
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
      {/* Dialog  khi xóa người dùng*/}
      <Dialog
        open={openDeleteUser}
        keepMounted
        onClose={() => setOpenDeleteUser(false)}
      >
        <DialogTitle>
          <Alert severity="warning">
            <FormattedMessage id="manager-user.delete_title" />
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="manager-user.delete_body" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteUser}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            <FormattedMessage id="Agree" />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteUser(false)}
          >
            <FormattedMessage id="close" />
          </Button>
        </DialogActions>
      </Dialog>
      {/* pop up khi xóa người dùng thành công */}
      <Snackbar
        open={popupDelete}
        autoHideDuration={3000}
        onClose={() => setPopupDelete(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupDelete(false)}
          severity={props.resDeleteUser === 0 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {props.resDeleteUser === 0 ? (
            <FormattedMessage id="manager-user.delete_success" />
          ) : (
            <FormattedMessage id="manager-user.delete_failed" />
          )}
        </Alert>
      </Snackbar>
      {/* Modal thêm người dùng */}
      <Modal open={openCreateUser} onClose={handleCloseCreateUser}>
        <Box className={styles.modal_body_create}>
          <h1 className={styles.modal_title}>
            <FormattedMessage id="form.title" />
          </h1>
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
              {/* phone number */}
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
        </Box>
      </Modal>
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
    resDeleteUser: state.system.resDeleteUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUsersRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.EditUserStart(data)),
    deleteUserRedux: (id) => dispatch(actions.DeleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
