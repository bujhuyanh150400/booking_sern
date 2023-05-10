import { useState } from "react";
import noImg from "../assets/images/noimg.jpg";
import { connect } from "react-redux";
import styles from "./TableData.module.scss";
import { FormattedMessage } from "react-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  ButtonGroup,
  Avatar,
  Box,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { LANGUAGES } from "../utils";
import AnimatedShowMore from "react-animated-show-more";
import CheckIcon from "@mui/icons-material/Check";
import _ from "lodash";
import moment from "moment";

// Pagination
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box className={styles.table_bottom}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
// Table
const TableData = (props) => {
  let {
    language,
    data,
    columnData,
    avatarRender,
    forUser,
    handleEdit,
    handleDelete,
    forAnotherData,
    handleConfirm,
  } = props;
  // set chỉnh sửa trang
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer className={styles.table_container}>
        <Table className={styles.table}>
          {/* Header */}
          <TableHead className={styles.table_header}>
            <TableRow className={styles.table_row}>
              {forUser ? (
                <>
                  <TableCell className={styles.table_row_item} align="center">
                    ID
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.fullname" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.email" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.gender" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.address" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.phonenumber" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.roleId" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.position" />
                  </TableCell>
                  <TableCell className={styles.table_row_item} align="center">
                    <FormattedMessage id="form.action" />
                  </TableCell>
                </>
              ) : (
                columnData &&
                columnData.length > 0 &&
                columnData.map((item, index) => {
                  return (
                    <TableCell
                      key={index}
                      className={styles.table_row_item}
                      align="center"
                    >
                      {item.name}
                    </TableCell>
                  );
                })
              )}
            </TableRow>
          </TableHead>
          <TableBody className={styles.table_body}>
            {/* Dành cho user */}
            {forUser &&
              data &&
              data.length > 0 &&
              (rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item, index) => (
                <TableRow key={index} className={styles.table_row}>
                  <TableCell align="center" className={styles.table_body_item}>
                    {item.id}
                  </TableCell>
                  {avatarRender && (
                    <TableCell
                      align="center"
                      className={styles.table_body_item}
                    >
                      <Box className={styles.table_body_item_image_holder}>
                        <Avatar alt="avatar" src={item.image} />
                        {item.fullname}
                      </Box>
                    </TableCell>
                  )}
                  <TableCell align="center" className={styles.table_body_item}>
                    {item?.email}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    {language === LANGUAGES.VI
                      ? item?.genderData?.valueVI
                      : item?.genderData?.valueEN}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    {item?.address}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    {item?.phonenumber}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    {language === LANGUAGES.VI
                      ? item?.roleData?.valueVI
                      : item?.roleData?.valueEN}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    {language === LANGUAGES.VI
                      ? item?.positionData?.valueVI
                      : item?.positionData?.valueEN}
                  </TableCell>
                  <TableCell align="center" className={styles.table_body_item}>
                    <ButtonGroup>
                      <Button
                        startIcon={<EditIcon />}
                        color="primary"
                        className={styles.table_btn_fix}
                        onClick={() => handleEdit(item)}
                      >
                        <FormattedMessage id="edit" />
                      </Button>
                      <Button
                        className={styles.table_btn_delete}
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(item)}
                      >
                        <FormattedMessage id="delete" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            {/* Dành cho dữ liệu bảng khác */}
            {forAnotherData &&
              data &&
              data?.length > 0 &&
              (rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item, index) => {
                let result;
                return (
                  <TableRow key={index} className={styles.table_row}>
                    {columnData.map((column) => {
                      result = item[column.value];
                      if (item[column.value] === Object(item[column.value])) {
                        if (result?.valueVI || result?.valueEN) {
                          return (
                            <TableCell
                              align="center"
                              className={styles.table_body_item}
                            >
                              {language === LANGUAGES.VI
                                ? result?.valueVI
                                : result?.valueEN}
                            </TableCell>
                          );
                        } else if (
                          result[column.valueChild]?.valueVI ||
                          result[column.valueChild]?.valueEN
                        ) {
                          return (
                            <TableCell
                              align="center"
                              className={styles.table_body_item}
                            >
                              {language === LANGUAGES.VI
                                ? result[column.valueChild]?.valueVI
                                : result[column.valueChild]?.valueEN}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              align="center"
                              className={styles.table_body_item}
                            >
                              {result[column.valueChild]}
                            </TableCell>
                          );
                        }
                      }
                      if (column.value.toLowerCase().includes("contenthtml")) {
                        return (
                          <TableCell
                            align="center"
                            className={styles.table_body_item}
                          >
                            <AnimatedShowMore
                              height={53}
                              toggle={({ isOpen }) =>
                                isOpen ? (
                                  <FormattedMessage id="close" />
                                ) : (
                                  <FormattedMessage id="seemore" />
                                )
                              }
                              speed={100}
                              shadowColor="rgba(255,255,255,0.4)"
                            >
                              <div
                                className={styles.detail}
                                dangerouslySetInnerHTML={{
                                  __html: result,
                                }}
                              ></div>
                            </AnimatedShowMore>
                          </TableCell>
                        );
                      }
                      if (column.value.toLowerCase().includes("image")) {
                        return (
                          <TableCell
                            align="center"
                            className={styles.table_body_item_image}
                          >
                            {!result ? (
                              <img
                                style={{ height: "56px", objectFit: "contain" }}
                                src={noImg}
                                alt="img"
                              />
                            ) : (
                              <img src={result} alt="img" />
                            )}
                          </TableCell>
                        );
                      }
                      if (column.value.toLowerCase().includes("editdelete")) {
                        return (
                          <TableCell
                            align="center"
                            className={styles.table_body_item}
                          >
                            <ButtonGroup>
                              <Button
                                startIcon={<EditIcon />}
                                color="primary"
                                className={styles.table_btn_fix}
                                onClick={() => handleEdit(item)}
                              >
                                Sửa
                              </Button>
                              <Button
                                className={styles.table_btn_delete}
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => handleDelete(item)}
                              >
                                Xóa
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        );
                      }
                      if (column.value.toLowerCase().includes("confirmsend")) {
                        return (
                          <TableCell
                            align="center"
                            className={styles.table_body_item}
                          >
                            <ButtonGroup>
                              <Button
                                startIcon={<CheckIcon />}
                                color="success"
                                className={styles.table_btn_fix}
                                onClick={() => handleConfirm(item)}
                              >
                                <FormattedMessage id="table.confirm" />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        );
                      }
                      if (column.value.toLowerCase().includes("date")) {
                        return (
                          <TableCell
                            align="center"
                            className={styles.table_body_item}
                          >
                            {moment.unix(result / 1000).format("DD/MM/YYYY")}
                          </TableCell>
                        );
                      }
                      return (
                        <>
                          <TableCell
                            align="center"
                            className={styles.table_body_item}
                          >
                            {result}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}></TableRow>
            )}
          </TableBody>
          <TableFooter className={styles.table_footer}>
            <TableRow className={styles.table_footer_row}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={
                  language === LANGUAGES.VI
                    ? "Số hàng mỗi trang: "
                    : "Rows per page: "
                }
                labelDisplayedRows={function defaultLabelDisplayedRows({
                  from,
                  to,
                  count,
                }) {
                  if (language === LANGUAGES.VI) {
                    return `${from}–${to} trong ${
                      count !== -1 ? count : `nhiều hơn ${to}`
                    }`;
                  }
                  if (language === LANGUAGES.EN) {
                    return `${from}–${to} of ${
                      count !== -1 ? count : `more than ${to}`
                    }`;
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
