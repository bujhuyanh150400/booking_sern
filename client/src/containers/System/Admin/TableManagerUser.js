import { connect } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import * as actions from "../../../store/actions";
import styles from "./UserRedux.module.scss";
import TableData from "../../../components/TableData";

const TableManagerUser = (props) => {
  // state user
  const {
    handleEditUserFromParent,
    listUser,
    fetchUsersRedux,
    handleOpenCreateUser,
    handleOpenDeleteUser,
    setIdUser,
  } = props;
  useEffect(() => {
    fetchUsersRedux();
  }, [fetchUsersRedux]);
  const users = listUser;
  // -- Xử lí edit user
  const handleEditUser = (user) => {
    handleEditUserFromParent(user);
    handleOpenCreateUser();
  };
  // -- xử lí delete user
  const handleDeleteUser = (user) => {
    setIdUser(user.id);
    handleOpenDeleteUser();
  };

  return (
    <>
      {/* Container */}
      <TableData
        data={users}
        avatarRender={true}
        forUser={true}
        handleEdit={handleEditUser}
        handleDelete={handleDeleteUser}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listUser: state.system.users,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
