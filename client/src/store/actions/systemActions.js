import actionTypes from "./actionTypes";
import webService from "../../services/webService";

// ----------------- option all code -------------------- //
// Gender
export const fetchGenderStart = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_GENDER_START });
    let res = await webService.getAllCodeService("GENDER");
    if (res && res.errCode === 0) {
      dispatch(fetchGenderSuccses(res.data));
    }
  } catch (err) {
    dispatch(fetchGenderFailed());
    console.log(err);
  }
};
export const fetchGenderSuccses = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  genderData: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//position
// Fetch data từ All code để lấy position
export const fetchPositionStart = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_POSITION_START });
    let res = await webService.getAllCodeService("POSITION");
    if (res && res.errCode === 0) {
      dispatch(fetchPositionSuccses(res.data));
    }
  } catch (err) {
    dispatch(fetchPositionFailed());
    console.log(err);
  }
};
// Khi thành công sẽ lấy data
export const fetchPositionSuccses = (PositionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  PositionData: PositionData,
});
// fail sẽ vào đây
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
//role
// Fetch data từ All code để lấy position
export const fetchRoleStart = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_ROLE_START });
    let res = await webService.getAllCodeService("ROLE");
    if (res && res.errCode === 0) {
      dispatch(fetchRoleSuccses(res.data));
    }
  } catch (err) {
    dispatch(fetchRoleFailed());
    console.log(err);
  }
};
// Khi thành công sẽ lấy data
export const fetchRoleSuccses = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  RoleData: RoleData,
});
// fail sẽ vào đây
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// ----------------- CRUD Users -------------------- //
// Fetch all users
export const fetchAllUserStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllUsers("ALL");
    if (res && res.errCode === 0) {
      dispatch(fetchAllUserSucces(res.userData.reverse()));
    }
  } catch (err) {
    dispatch(fetchAllUserFailed());
    console.log(err);
  }
};
export const fetchAllUserSucces = (userData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  userData: userData,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
// Fetch user by id
export const fetchUserByIdStart = (id) => async (dispatch) => {
  try {
    let res = await webService.getAllUsers(id);
    if (res && res.errCode === 0) {
      dispatch(fetchUserByIdSucces(res.userData));
    }
  } catch (err) {
    dispatch(fetchUserByIdFailed());
    console.log(err);
  }
};
export const fetchUserByIdSucces = (userData) => ({
  type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
  userData,
});
export const fetchUserByIdFailed = () => ({
  type: actionTypes.FETCH_USER_BY_ID_FAILED,
});
// Create user
export const createNewUser = (data) => async (dispatch) => {
  try {
    let res = await webService.postNewUser(data);
    if (res && res.errCode === 0) {
      dispatch(createUserSuccess());
      dispatch(fetchAllUserStart());
    } else {
      dispatch(createUserFailed());
    }
  } catch (err) {
    dispatch(createUserFailed());
    console.log(err);
  }
};
export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
// Delete user
export const DeleteUserStart = (userId) => async (dispatch) => {
  try {
    let res = await webService.deleteUser(userId);
    if (res && res.errCode === 0) {
      dispatch(DeleteUserSucces(res.errCode));
      dispatch(fetchAllUserStart());
    } else {
      dispatch(DeleteUserFailed());
    }
  } catch (err) {
    dispatch(DeleteUserFailed());
    console.log(err);
  }
};
export const DeleteUserSucces = (res) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  res,
});
export const DeleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
// Edit user
export const EditUserStart = (data) => async (dispatch) => {
  try {
    let res = await webService.editUser(data);
    if (res && res.errCode === 0) {
      dispatch(EditUserSucces());
      dispatch(fetchAllUserStart());
    } else {
      dispatch(EditUserFailed());
    }
  } catch (err) {
    dispatch(EditUserFailed());
    console.log(err);
  }
};
export const EditUserSucces = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const EditUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// ----------------- For Doctor -------------------- //

// Fetch all doctor
export const fetchAllDoctorStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllDoctor();
    if (res && res.errCode === 0) {
      dispatch(fetchAllDoctorSuccess(res.data));
    } else {
      dispatch(fetchAllDoctorFailed());
    }
  } catch (err) {
    dispatch(fetchAllDoctorFailed());
    console.log(err);
  }
};
export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  dataDoctor: data,
});
export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});
// Save detail cho doctor
export const saveDetailDoctorStart = (data) => async (dispatch) => {
  try {
    let res = await webService.saveDetailDoctor(data);
    if (res && res.errCode === 0) {
      dispatch(saveDetailDoctorSuccess(res.errCode));
    } else {
      console.log(res);
      dispatch(saveDetailDoctorFailed());
    }
  } catch (err) {
    dispatch(saveDetailDoctorFailed());
  }
};
export const saveDetailDoctorSuccess = (res) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  res,
});
export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});
// lấy thông tin bác sĩ qua ID
export const fetchDoctorByIdStart = (id) => async (dispatch) => {
  try {
    let res = await webService.getDetailDoctorById(id);
    if (res && res.errCode === 0) {
      dispatch(fetchDoctorByIdSuccess(res.data));
    } else {
      dispatch(fetchDoctorByIdFailed());
    }
  } catch (err) {
    dispatch(fetchDoctorByIdFailed());
    console.log(err);
  }
};
export const fetchDoctorByIdSuccess = (dataDoctor) => ({
  type: actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_SUCCESS,
  dataDoctor: dataDoctor,
});
export const fetchDoctorByIdFailed = () => ({
  type: actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_FAILED,
});
// Lấy thông tin Markdown để chỉnh sửa thông tin chi tiết của bác sĩ
export const getMarkDownDoctorStart = (id) => async (dispatch) => {
  try {
    let res = await webService.getDetailDoctorMarkDown(id);
    if (res && res.errCode === 0) {
      dispatch(getMarkDownDoctorSuccess(res.data.Markdown));
    } else {
      dispatch(getMarkDownDoctorFailed());
    }
  } catch (err) {
    dispatch(getMarkDownDoctorFailed());
  }
};
export const getMarkDownDoctorSuccess = (dataDoctor) => ({
  type: actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS,
  dataDoctor: dataDoctor,
});
export const getMarkDownDoctorFailed = () => ({
  type: actionTypes.GET_MARKDOWN_DOCTOR_FAILED,
});
// Lấy giờ khám bệnh
export const fetchScheduleTimesStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllCodeService("TIME");
    if (res && res.errCode === 0) {
      dispatch(fetchScheduleTimesSuccses(res.data));
    }
  } catch (err) {
    dispatch(fetchScheduleTimesFailed());
    console.log(err);
  }
};
export const fetchScheduleTimesSuccses = (timeData) => ({
  type: actionTypes.FETCH_SCHEDULE_TIMES_SUCCESS,
  timeData: timeData,
});
export const fetchScheduleTimesFailed = () => ({
  type: actionTypes.FETCH_SCHEDULE_TIMES_FAILED,
});
// Lấy thông tin Bác sĩ (giá,payment,tỉnh thành)
export const getRequireDoctorInfoStart = () => async (dispatch) => {
  try {
    let resPrice = await webService.getAllCodeService("PRICE");
    let resPayment = await webService.getAllCodeService("PAYMENT");
    let resProvince = await webService.getAllCodeService("PROVINCE");
    let resSpecialty = await webService.getAllSpecialty();

    if (
      resPrice &&
      resPrice.errCode === 0 &&
      resPayment &&
      resPayment.errCode === 0 &&
      resProvince &&
      resProvince.errCode === 0 &&
      resSpecialty &&
      resSpecialty.errCode === 0
    ) {
      let data = {
        resPrice: resPrice.data,
        resPayment: resPayment.data,
        resProvince: resProvince.data,
        resSpecialty: resSpecialty.data,
      };
      dispatch(getRequireDoctorInfoSucces(data));
    }
  } catch (err) {
    dispatch(getRequireDoctorInfoFailed());
    console.log(err);
  }
};
export const getRequireDoctorInfoSucces = (dataReqDoctor) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
  dataReqDoctor,
});
export const getRequireDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_FAILED,
});
// Lấy danh sách lịch hẹn booking
export const fetchListPatientForDoctorStart =
  (doctorId, date) => async (dispatch) => {
    try {
      let res = await webService.getListPatientForDoctor(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch(fetchListPatientForDoctorSuccses(res.data));
      }
    } catch (err) {
      dispatch(fetchListPatientForDoctorFailed());
      console.log(err);
    }
  };
export const fetchListPatientForDoctorSuccses = (data) => ({
  type: actionTypes.FETCH_LIST_PATIENT_FOR_DOCTOR_SUCCESS,
  data,
});
export const fetchListPatientForDoctorFailed = () => ({
  type: actionTypes.FETCH_LIST_PATIENT_FOR_DOCTOR_FAILED,
});
export const fetchBookingDoneForDoctorStart =
  (doctorId, date) => async (dispatch) => {
    try {
      let res = await webService.getListBookingDoneForDoctor(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch(fetchBookingDoneForDoctorSuccses(res.data));
      }
    } catch (err) {
      dispatch(fetchBookingDoneForDoctorFailed());
      console.log(err);
    }
  };
export const fetchBookingDoneForDoctorSuccses = (data) => ({
  type: actionTypes.FETCH_LIST_BOOKING_DONE_SUCCESS,
  data,
});
export const fetchBookingDoneForDoctorFailed = () => ({
  type: actionTypes.FETCH_LIST_BOOKING_DONE_FAILED,
});
// ----------------- For Clinic -------------------- //
// Tạo mới 1 phòng khám
export const createNewClinic = (data) => async (dispatch) => {
  try {
    let res = await webService.createNewClinic(data);
    if (res && res.errCode === 0) {
      dispatch(createNewClinicSuccess(res.errCode));
      dispatch(fetchAllClinicStart());
    } else {
      dispatch(createNewClinicFailed());
    }
  } catch (err) {
    dispatch(createNewClinicFailed());
    console.log(err);
  }
};
export const createNewClinicSuccess = (res) => ({
  type: actionTypes.CREATE_NEW_CLINIC_SUCCESS,
  res,
});
export const createNewClinicFailed = () => ({
  type: actionTypes.CREATE_NEW_CLINIC_FAILED,
});
// Hiển thị tất cả phòng khám
export const fetchAllClinicStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllClinic();
    if (res && res.errCode === 0) {
      dispatch(fetchAllClinicSuccess(res.data));
    }
  } catch (err) {
    dispatch(fetchAllClinicFailed());
    console.log(err);
  }
};
export const fetchAllClinicSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  data,
});
export const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});
// Xóa 1 phòng khám theo Id
export const DeleteClinicStart = (id) => async (dispatch) => {
  try {
    let res = await webService.handleDeleteClinic(id);
    if (res && res.errCode === 0) {
      dispatch(DeleteClinicSuccess(res.errCode));
      dispatch(fetchAllClinicStart());
    } else {
      dispatch(DeleteClinicFailed());
    }
  } catch (err) {
    dispatch(DeleteClinicFailed());
    console.log(err);
  }
};
export const DeleteClinicSuccess = (res) => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
  res,
});
export const DeleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAILED,
});
// update phòng khám
export const EditClinicStart = (data) => async (dispatch) => {
  try {
    let res = await webService.handleUpdateClinic(data);
    if (res && res.errCode === 0) {
      dispatch(EditClinicSucces(res.errCode));
      dispatch(fetchAllClinicStart());
    } else {
      dispatch(EditClinicFailed());
    }
  } catch (err) {
    dispatch(EditClinicFailed());
    console.log(err);
  }
};
export const EditClinicSucces = (res) => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
  res,
});
export const EditClinicFailed = () => ({
  type: actionTypes.EDIT_CLINIC_FAILED,
});
// Lấy thông tin tỉnh thành
export const fetchProvinceStart = () => async (dispatch) => {
  try {
    let resProvince = await webService.getAllCodeService("PROVINCE");
    if (resProvince && resProvince.errCode === 0) {
      let data = resProvince.data;
      dispatch(fetchProvinceSuccess(data));
    }
  } catch (err) {
    dispatch(fetchProvinceFailed());
    console.log(err);
  }
};
export const fetchProvinceSuccess = (data) => ({
  type: actionTypes.FETCH_PROVINCE_SUCCESS,
  data,
});
export const fetchProvinceFailed = () => ({
  type: actionTypes.FETCH_PROVINCE_FAILED,
});

// ----------------- For specialty -------------------- //
// Tạo mới 1 phòng khám
export const createNewSpecialtyStart = (data) => async (dispatch) => {
  try {
    let res = await webService.createNewSpecialty(data);
    if (res && res.errCode === 0) {
      dispatch(createNewSpecialtySuccess(res.errCode));
      dispatch(fetchAllSpecialtyStart());
    } else {
      dispatch(createNewSpecialtyFailed());
    }
  } catch (err) {
    dispatch(createNewSpecialtyFailed());
    console.log(err);
  }
};
export const createNewSpecialtySuccess = (res) => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
  res,
});
export const createNewSpecialtyFailed = () => ({
  type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
});

// // Hiển thị tất cả phòng khám
export const fetchAllSpecialtyStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllSpecialty();
    if (res && res.errCode === 0) {
      dispatch(fetchAllSpecialtySuccess(res.data));
    }
  } catch (err) {
    dispatch(fetchAllSpecialtyFailed());
    console.log(err);
  }
};
export const fetchAllSpecialtySuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  data,
});
export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

// // Xóa 1 specialty theo Id
export const DeleteSpecialtyStart = (id) => async (dispatch) => {
  try {
    let res = await webService.handleDeleteSpecialty(id);
    if (res && res.errCode === 0) {
      dispatch(DeleteSpecialtySuccess(res.errCode));
      dispatch(fetchAllSpecialtyStart());
    } else {
      dispatch(DeleteSpecialtyFailed());
    }
  } catch (err) {
    dispatch(DeleteSpecialtyFailed());
    console.log(err);
  }
};
export const DeleteSpecialtySuccess = (res) => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS,
  res,
});
export const DeleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAILED,
});
// update specialty
export const EditSpecialtyStart = (data) => async (dispatch) => {
  try {
    let res = await webService.handleUpdateSpecialty(data);
    if (res && res.errCode === 0) {
      dispatch(EditSpecialtySucces(res.errCode));
      dispatch(fetchAllSpecialtyStart());
    } else {
      dispatch(EditSpecialtyFailed());
    }
  } catch (err) {
    dispatch(EditSpecialtyFailed());
    console.log(err);
  }
};
export const EditSpecialtySucces = (res) => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
  res,
});
export const EditSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILED,
});
