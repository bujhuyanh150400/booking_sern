import { connect } from "react-redux";
import styles from "./ManagerSpecialty.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import { useEffect, useState } from "react";
import ModalAddSpecialty from "./ModalAddSpecialty";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
import TableManagerSpecialty from "./TableManagerSpecialty";
import Loading from "../../../components/Loading";
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// Body
const ManagerSpecialty = (props) => {
  let { resDeleteSpecialty, deleteSpecialty } = props;
  // Loading
  const [loading, setLoading] = useState(false);
  // State
  const [dataSpecialty, setDataSpecialty] = useState({});

  // Action
  const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
  // Tạo phòng khám
  const createSpecialty = () => {
    handleOpenCreate();
    setAction(CRUD_ACTIONS.CREATE);
  };
  // Id phòng khám
  const [idSpecialty, setIdSpecialty] = useState("");
  // Pop modal success và tooltips
  const [failed, setFailed] = useState(false);
  const [popupCreate, setPopupCreate] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  // -- Xử lí edit user
  const handleEditSpecialtyFromParent = (data) => {
    setDataSpecialty(data);
    setAction(CRUD_ACTIONS.EDIT);
  };
  // -- Xử lí delete
  useEffect(() => {
  }, [resDeleteSpecialty]);
  const handleDeleteUser = () => {
    setLoading(true);
    deleteSpecialty(idSpecialty);
    setOpenDelete(false);
    if (resDeleteSpecialty === 0) {
      setLoading(false);
      setPopupDelete(true);
    } else if (resDeleteSpecialty !== 0) {
      setLoading(false);
      setPopupDelete(true);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.header}>
          <FormattedMessage id="menu.Admin_role.manager-specialty.specialtys" />
        </div>
        <div className={styles.body}>
          <div className={styles.btn_holder_add}>
            <button className={styles.btn_add} onClick={createSpecialty}>
              <FormattedMessage id="menu.Admin_role.manager-specialty.add" />
            </button>
            <TableManagerSpecialty
              handleOpenCreate={handleOpenCreate}
              handleEditSpecialtyFromParent={handleEditSpecialtyFromParent}
              setOpenDelete={setOpenDelete}
              setAction={setAction}
              setIdSpecialty={setIdSpecialty}
            />
          </div>
        </div>
      </div>
      <ModalAddSpecialty
        openCreate={openCreate}
        handleCloseCreate={handleCloseCreate}
        setPopupCreate={setPopupCreate}
        setFailed={setFailed}
        dataSpecialty={dataSpecialty}
        action={action}
        setAction={setAction}
      />
      {/*  pop up khi tạo & lưu thành công */}
      <Snackbar
        open={popupCreate}
        autoHideDuration={3000}
        onClose={() => setPopupCreate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupCreate(false)}
          severity={failed ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {failed === true
            ? "Lưu chuyên khoa thất bại "
            : "Lưu chuyên khoa thành công"}
        </Alert>
      </Snackbar>
      {/* pop up khi xóa chuyên khoa thành công */}
      <Snackbar
        open={popupDelete}
        autoHideDuration={3000}
        onClose={() => setPopupDelete(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupDelete(false)}
          severity={resDeleteSpecialty === 0 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {resDeleteSpecialty === 0
            ? "Xóa chuyên khoa thành công"
            : "xóa chuyên khoa thất bại"}
        </Alert>
      </Snackbar>
      {/* Dialog khi xóa */}
      <Dialog
        open={openDelete}
        keepMounted
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>
          <Alert severity="warning">Xóa người dùng</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc là muốn xóa chuyên khoa này không ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteUser}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Đồng ý
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDelete(false)}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    resDeleteSpecialty: state.system.resDeleteSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSpecialty: (id) => dispatch(actions.DeleteSpecialtyStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
