import { connect } from "react-redux";
import styles from "./ManagerClinic.module.scss";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
import * as actions from "../../../store/actions";
import TableManagerClinic from "./TableManagerClinic";
import ModalAddClinic from "./ModalAddClinic";
import { CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
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

const ManagerClinic = (props) => {
  let { resDeleteClinic } = props;
  // Loading
  const [loading, setLoading] = useState(false);
  // data clinic
  const [dataClinic, setDataClinic] = useState({});
  // Bật tắt modal tạo
  const createClinic = () => {
    handleOpenCreate();
    setAction(CRUD_ACTIONS.CREATE);
  };
  // Id phòng khám
  const [id, setId] = useState("");
  // Pop modal success và tooltips
  const [failed, setFailed] = useState(false);
  const [popupCreate, setPopupCreate] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [action, setAction] = useState(CRUD_ACTIONS.CREATE);
  // -- Xử lí edit
  const handleEditClinicFromParent = (data) => {
    setDataClinic(data);
    setAction(CRUD_ACTIONS.EDIT);
  };
  // -- Xử lí delete
  useEffect(() => {
  }, [resDeleteClinic]);
  const handleDeleteUser = () => {
    setLoading(true);
    props.deleteClinic(id);
    setOpenDelete(false);
    if (resDeleteClinic === 0) {
      setLoading(false);
      setPopupDelete(true);
    } else {
      setLoading(false);
      setPopupDelete(true);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.header}>Quản lý phòng khám</div>
        <div className={styles.body}>
          <div className={styles.btn_holder_add}>
            <Button className={styles.btn_add} onClick={createClinic}>
              <FormattedMessage id="menu.Admin_role.manager-clinic.add" />
            </Button>
          </div>
          <TableManagerClinic
            handleOpenCreate={handleOpenCreate}
            handleEditClinicFromParent={handleEditClinicFromParent}
            setOpenDelete={setOpenDelete}
            setAction={setAction}
            setId={setId}
          />
        </div>
      </div>
      {/* Modal add clinic */}
      <ModalAddClinic
        openCreate={openCreate}
        handleCloseCreate={handleCloseCreate}
        dataClinic={dataClinic}
        action={action}
        setAction={setAction}
        setFailed={setFailed}
        setPopupCreate={setPopupCreate}
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
            ? "Lưu phòng khám thất bại "
            : "Lưu phòng khám thành công"}
        </Alert>
      </Snackbar>
      {/* pop up khi xóa người dùng thành công */}
      <Snackbar
        open={popupDelete}
        autoHideDuration={3000}
        onClose={() => setPopupDelete(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setPopupDelete(false)}
          severity={resDeleteClinic === 0 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {resDeleteClinic === 0
            ? "Xóa người dùng thành công"
            : "xóa người dùng thất bại"}
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
            Bạn có chắc là muốn xóa người dùng không ?
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
    resDeleteClinic: state.system.resDeleteClinic,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClinic: (id) => dispatch(actions.DeleteClinicStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerClinic);
