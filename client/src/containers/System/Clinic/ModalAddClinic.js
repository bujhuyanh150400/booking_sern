import { connect } from "react-redux";
import styles from "./ManagerClinic.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  Modal,
  Button,
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, CommonUtils, LANGUAGES } from "../../../utils";
import avatarPreviewDemo from "../../../assets/images/logo/demo_speciality.png";
import * as actions from "../../../store/actions";
import { ToolTipCustom } from "../../../components/CustomMui";

// Modal thêm chuyên khoa
const ModalAddClinic = (props) => {
  // props
  let {
    setFailed,
    createNewClinicRedux,
    resClinic,
    dataClinic,
    EditClinicRedux,
    resEditClinic,
    fetchProvinceRedux,
    provinceRedux,
    language,
    openCreate,
    setAction,
    action,
    setPopupCreate,
    handleCloseCreate,
  } = props;
  // State
  const [contentHTMLIntro, setContentHTMLIntro] = useState("");
  const [contentMarkDownIntro, setContentMarkDownIntro] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [provinceId, setProvince] = useState("");
  const [idClinic, setIdClinic] = useState("");
  const [isValid, setIsValid] = useState(false);
  // Avatar Preview
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    fetchProvinceRedux();
  }, []);
  let provinces = provinceRedux;
  //-- Xử lí onChange AvatarPreview
  const handleAvatarPreview = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Chuyển đổi sang base64
      let base64 = await CommonUtils.getBase64(file);
      // Image creat thành 1 link url để preview Avatar
      let objectURL = URL.createObjectURL(file);
      setAvatarPreview(objectURL);
      setImage(base64);
    }
  };
  //-- markdown thông tin phhòng khám
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleEditor = ({ html, text }) => {
    setContentHTMLIntro(html);
    setContentMarkDownIntro(text);
  };
  // Xử lí clear input khi thành công
  useEffect(() => {
  }, [resClinic, resEditClinic]);
  // Edit or create
  useEffect(() => {
    if (action === CRUD_ACTIONS.EDIT) {
      setAction(CRUD_ACTIONS.EDIT);
      setIdClinic(dataClinic.id);
      setContentHTMLIntro(dataClinic.contentHTMLIntro);
      setContentMarkDownIntro(dataClinic.contentMarkDownIntro);
      setAvatarPreview(dataClinic.image);
      setName(dataClinic.name);
      setProvince(dataClinic.provinceId);
      setAddress(dataClinic.address);
    }
    if (action === CRUD_ACTIONS.CREATE) {
      setAction(CRUD_ACTIONS.CREATE);
      setContentHTMLIntro("");
      setContentMarkDownIntro("");
      setAvatarPreview("");
      setName("");
      setProvince("");
      setAddress("");
    }
  }, [dataClinic, action]);
  //-- Xử lí validate
  useEffect(() => {
    if (
      contentHTMLIntro &&
      contentMarkDownIntro &&
      name &&
      address &&
      provinceId
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [contentHTMLIntro, contentMarkDownIntro, name, address, provinceId]);
  //   Xử lí submit
  const handleSubmit = () => {
    if (action === CRUD_ACTIONS.CREATE) {
      createNewClinicRedux({
        name,
        image,
        address,
        provinceId,
        contentMarkDownIntro,
        contentHTMLIntro,
      });
      if (resClinic === 0) {
        setContentHTMLIntro("");
        setContentMarkDownIntro("");
        setAvatarPreview("");
        setImage("");
        setName("");
        setProvince("");
        setAddress("");
        setFailed(false);
        setPopupCreate(true);
        handleCloseCreate();
      } else {
        setFailed(true);
        setPopupCreate(true);
      }
    }
    if (action === CRUD_ACTIONS.EDIT) {
      EditClinicRedux({
        id: idClinic,
        name,
        image,
        address,
        provinceId,
        contentMarkDownIntro,
        contentHTMLIntro,
      });
      if (resEditClinic === 0) {
        setContentHTMLIntro("");
        setContentMarkDownIntro("");
        setAvatarPreview("");
        setImage("");
        setName("");
        setProvince("");
        setAddress("");
        setFailed(false);
        setPopupCreate(true);
        handleCloseCreate();
      } else {
        setFailed(true);
        setPopupCreate(true);
      }
    }
  };

  // Render
  return (
    <Modal open={openCreate} onClose={handleCloseCreate}>
      <Box className={styles.modal_body_create}>
        <h1 className={styles.modal_title}>
          <FormattedMessage id="menu.Admin_role.manager-clinic.form" />
        </h1>
        <div className={styles.form}>
          {/* form */}
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
              <Button
                variant="contained"
                component="label"
                className={styles.label_avatarPreview}
              >
                <FormattedMessage id="menu.Admin_role.manager-clinic.image_upload" />
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleAvatarPreview}
                  hidden
                />
              </Button>
            </div>
            <div className={styles.form_input}>
              {/* name */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="name"
                  label={
                    <FormattedMessage id="menu.Admin_role.manager-clinic.name" />
                  }
                  name="name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              {/* tỉnh thành */}
              <FormControl className={styles.form_controller}>
                <InputLabel id="role">
                  <FormattedMessage id="menu.Admin_role.manager-clinic.province" />
                </InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={provinceId}
                  label="province"
                  onChange={(e) => setProvince(e.target.value)}
                >
                  {provinces &&
                    provinces.length > 0 &&
                    provinces.map((roles, index) => {
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
              {/* địa chỉ */}
              <FormControl
                variant="outlined"
                className={styles.form_controller}
              >
                <TextField
                  id="address"
                  label={
                    <FormattedMessage id="menu.Admin_role.manager-clinic.location" />
                  }
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </div>
          </div>
          {/* Chi tiết */}
          <div className={styles.markdown_container}>
            <h2 className={styles.label}>
              <FormattedMessage id="menu.Admin_role.manager-clinic.detail" />
            </h2>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditor}
              value={contentMarkDownIntro}
            />
          </div>
        </div>
        <Box className={styles.save_holder}>
          {/* Button submit */}
          {isValid ? (
            <Button className={styles.save} onClick={handleSubmit}>
              {action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id="menu.Admin_role.manager-clinic.save" />
              ) : (
                <FormattedMessage id="menu.Admin_role.manager-clinic.add" />
              )}
            </Button>
          ) : (
            <>
              <ToolTipCustom
                placement="left"
                title={<FormattedMessage id="manager-user.tooltip" />}
              >
                <Button className={styles.save_unactive}>
                  {action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="menu.Admin_role.manager-clinic.save" />
                  ) : (
                    <FormattedMessage id="menu.Admin_role.manager-clinic.add" />
                  )}
                </Button>
              </ToolTipCustom>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    resClinic: state.system.resClinic,
    resEditClinic: state.system.resEditClinic,
    provinceRedux: state.system.province,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewClinicRedux: (data) => dispatch(actions.createNewClinic(data)),
    EditClinicRedux: (data) => dispatch(actions.EditClinicStart(data)),
    fetchProvinceRedux: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddClinic);
