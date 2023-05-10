import { connect } from "react-redux";
import styles from "./ManagerSpecialty.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import avatarPreviewDemo from "../../../assets/images/logo/demo_speciality.png";
import {
  Modal,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
import * as actions from "../../../store/actions";
import { ToolTipCustom } from "../../../components/CustomMui";

// Modal thêm chuyên khoa
const ModalAddSpecialty = (props) => {
  let {
    setFailed,
    createNewSpecialtyRedux,
    resSpecialty,
    dataSpecialty,
    EditSpecialtyRedux,
    resEditSpecialty,
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
  const [idSpecialty, setIdSpecialty] = useState("");
  const [isValid, setIsValid] = useState(false);
  // Avatar Preview
  const [avatarPreview, setAvatarPreview] = useState("");

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
  // Xử lí reset khi có response từ server
  useEffect(() => {
  }, [resSpecialty, resEditSpecialty]);
  // Edit or create
  useEffect(() => {
    if (action === CRUD_ACTIONS.EDIT) {
      setAction(CRUD_ACTIONS.EDIT);
      setIdSpecialty(dataSpecialty.id);
      setContentHTMLIntro(dataSpecialty.contentHTMLIntro);
      setContentMarkDownIntro(dataSpecialty.contentMarkDownIntro);
      setAvatarPreview(dataSpecialty.image);
      setName(dataSpecialty.name);
    }
    if (action === CRUD_ACTIONS.CREATE) {
      setAction(CRUD_ACTIONS.CREATE);
      setContentHTMLIntro("");
      setContentMarkDownIntro("");
      setAvatarPreview("");
      setName("");
    }
  }, [dataSpecialty, action]);
  //-- Xử lí validate
  useEffect(() => {
    if (contentHTMLIntro && contentMarkDownIntro && name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [contentHTMLIntro, contentMarkDownIntro, name]);

  //   Xử lí submit
  const handleSubmit = () => {
    if (action === CRUD_ACTIONS.CREATE) {
      createNewSpecialtyRedux({
        name,
        image,
        contentMarkDownIntro,
        contentHTMLIntro,
      });
      if (resSpecialty === 0) {
        setContentHTMLIntro("");
        setContentMarkDownIntro("");
        setAvatarPreview("");
        setImage("");
        setName("");
        setFailed(false);
        setPopupCreate(true);
        handleCloseCreate();
      } else {
        setFailed(true);
        setPopupCreate(true);
      }
    }
    if (action === CRUD_ACTIONS.EDIT) {
      EditSpecialtyRedux({
        id: idSpecialty,
        name,
        image,
        contentMarkDownIntro,
        contentHTMLIntro,
      });
      if (resEditSpecialty === 0) {
        setContentHTMLIntro("");
        setContentMarkDownIntro("");
        setAvatarPreview("");
        setImage("");
        setName("");
        setFailed(false);
        setPopupCreate(true);
        handleCloseCreate();
      } else {
        setFailed(true);
        setPopupCreate(true);
      }
    }
  };

  return (
    <>
      <Modal open={openCreate} onClose={handleCloseCreate}>
        <Box className={styles.modal_body_create}>
          <h1 className={styles.modal_title}>
            <FormattedMessage id="menu.Admin_role.manager-specialty.form" />
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
                  <FormattedMessage id="menu.Admin_role.manager-specialty.image_upload" />
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
                      <FormattedMessage id="menu.Admin_role.manager-specialty.name" />
                    }
                    name="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </div>
            </div>
            {/* Chi tiết */}
            <div className={styles.markdown_container}>
              <h2 className={styles.label}>
                <FormattedMessage id="menu.Admin_role.manager-specialty.detail" />
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
                  <FormattedMessage id="menu.Admin_role.manager-specialty.save" />
                ) : (
                  <FormattedMessage id="menu.Admin_role.manager-specialty.add" />
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
                      <FormattedMessage id="menu.Admin_role.manager-specialty.save" />
                    ) : (
                      <FormattedMessage id="menu.Admin_role.manager-specialty.add" />
                    )}
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
    resSpecialty: state.system.resSpecialty,
    resEditSpecialty: state.system.resEditSpecialty,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewSpecialtyRedux: (data) =>
      dispatch(actions.createNewSpecialtyStart(data)),
    EditSpecialtyRedux: (data) => dispatch(actions.EditSpecialtyStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddSpecialty);
