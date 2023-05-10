import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../../store/actions";
import styles from "./ManagerSpecialty.module.scss";
import { Table } from "reactstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import AnimatedShowMore from "react-animated-show-more";
import TableData from "../../../components/TableData";

const TableManagerSpecialty = (props) => {
  // state user
  const {
    dataAllSpecialty,
    fetchAllSpecialtyRedux,
    handleEditSpecialtyFromParent,
    setIdSpecialty,
    setOpenDelete,
    handleOpenCreate,
  } = props;
  // Lấy data specialty
  useEffect(() => {
    fetchAllSpecialtyRedux();
  }, []);
  const specialtys = dataAllSpecialty;
  // -- Xử lí edit user
  const handleEditSpecialty = (data) => {
    handleEditSpecialtyFromParent(data);
    handleOpenCreate();
  };
  // -- xử lí delete user
  const handleDeleteSpecialty = (item) => {
    setIdSpecialty(item.id);
    setOpenDelete(true);
  };
  // Cột của bảng
  const column = [
    {
      name: "ID",
      value: "id",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-specialty.image" />,
      value: "image",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-specialty.name" />,
      value: "name",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-specialty.detail" />,
      value: "contentHTMLIntro",
    },
    {
      name: (
        <FormattedMessage id="menu.Admin_role.manager-specialty.edit_delete" />
      ),
      value: "editDelete",
    },
  ];
  return (
    <>
      <TableData
        columnData={column}
        data={specialtys}
        forAnotherData={true}
        handleEdit={handleEditSpecialty}
        handleDelete={handleDeleteSpecialty}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataAllSpecialty: state.system.dataAllSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManagerSpecialty);
