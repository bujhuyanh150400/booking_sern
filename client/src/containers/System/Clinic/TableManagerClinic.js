import { connect } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import TableData from "../../../components/TableData";
const TableManagerClinic = (props) => {
  // state user
  const {
    dataAllClinic,
    fetchClinicRedux,
    resDeleteClinic,
    setOpenDelete,
    handleEditClinicFromParent,
    handleOpenCreate,
    setId,
  } = props;
  // Lấy data clinic
  useEffect(() => {
    fetchClinicRedux();
  }, [resDeleteClinic]);
  const clinics = dataAllClinic.rows;
  // -- Xử lí edit user
  const handleEditClinic = (data) => {
    handleEditClinicFromParent(data);
    // Mở modal add clinic
    handleOpenCreate();
  };
  // -- xử lí delete user
  const handleDeleteClinic = (item) => {
    setId(item.id);
    setOpenDelete(true);
  };
  // Cột của bảng
  const column = [
    {
      name: "ID",
      value: "id",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-clinic.image" />,
      value: "image",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-clinic.name" />,
      value: "name",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-clinic.province" />,
      value: "provinceData",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-clinic.location" />,
      value: "address",
    },
    {
      name: <FormattedMessage id="menu.Admin_role.manager-clinic.detail" />,
      value: "contentHTMLIntro",
    },
    {
      name: (
        <FormattedMessage id="menu.Admin_role.manager-clinic.edit_delete" />
      ),
      value: "editDelete",
    },
  ];
  return (
    <TableData
      columnData={column}
      data={clinics}
      forAnotherData={true}
      handleEdit={handleEditClinic}
      handleDelete={handleDeleteClinic}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataAllClinic: state.system.dataAllClinic,
    resDeleteClinic: state.system.resDeleteClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
    deleteClinic: (id) => dispatch(actions.DeleteClinicStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerClinic);
