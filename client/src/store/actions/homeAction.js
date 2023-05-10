import actionTypes from "./actionTypes";
import webService from "../../services/webService";

// Fetch bác sĩ hiển thị ở trên home page
export const fetchTopDoctorStart = () => async (dispatch) => {
  try {
    let res = await webService.getTopDoctorHomeService("8");
    if (res && res.errCode === 0) {
      dispatch(fetchTopDoctorSuccess(res.data));
    } else {
      dispatch(fetchTopDoctorFailed());
    }
  } catch (err) {
    dispatch(fetchTopDoctorFailed());
  }
};
export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  dataDoctor: data,
});
export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

// Lấy All thông tin về chuyên khoa
export const fetchTopSpecialtiesStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllSpecialty();
    if (res && res.errCode === 0) {
      dispatch(fetchTopSpecialtiesSuccess(res.data));
    } else {
      dispatch(fetchTopSpecialtiesFailed());
    }
  } catch (err) {
    dispatch(fetchTopSpecialtiesFailed());
    console.log(err);
  }
};
export const fetchTopSpecialtiesSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_SPECIALTIES_SUCCESS,
  topSpecialties: data,
});
export const fetchTopSpecialtiesFailed = () => ({
  type: actionTypes.FETCH_TOP_SPECIALTIES_FAILED,
});

// Lấy thông tin trong trang chi tiết chuyên khoa
export const fetchSpecialtyByIdStart = (data) => async (dispatch) => {
  try {
    let res = await webService.getDetailSpecialtyById(data);
    if (res && res.errCode === 0) {
      dispatch(fetchSpecialtyByIdSuccess(res.data));
    } else {
      dispatch(fetchSpecialtyByIdFailed());
    }
  } catch (err) {
    dispatch(fetchTopSpecialtiesFailed());
    console.log(err);
  }
};
export const fetchSpecialtyByIdSuccess = (data) => ({
  type: actionTypes.FETCH_DETAIL_SPECIALTY_BY_ID_SUCCESS,
  data,
});
export const fetchSpecialtyByIdFailed = () => ({
  type: actionTypes.FETCH_DETAIL_SPECIALTY_BY_ID_FAILED,
});

// Lấy thông tin tỉnh thành
export const fetchProvinceStart = () => async (dispatch) => {
  try {
    let res = await webService.getAllCodeService("PROVINCE");
    if (res && res.errCode === 0) {
      dispatch(fetchProvinceSuccess(res.data));
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

// Lấy thông tin trong trang chi tiết phòng khám
export const fetchClinicByIdStart = (data) => async (dispatch) => {
  try {
    let res = await webService.getDetailClinicById(data);
    if (res && res.errCode === 0) {
      dispatch(fetchClinicByIdSuccess(res.data));
    } else {
      dispatch(fetchClinicByIdFailed());
    }
  } catch (err) {
    dispatch(fetchTopSpecialtiesFailed());
    console.log(err);
  }
};
export const fetchClinicByIdSuccess = (data) => ({
  type: actionTypes.FETCH_DETAIL_CLINIC_BY_ID_SUCCESS,
  data,
});
export const fetchClinicByIdFailed = () => ({
  type: actionTypes.FETCH_DETAIL_CLINIC_BY_ID_FAILED,
});

// Lấy thông tin trong trang chi tiết phòng khám
export const getListClinicByProvinceStart = (province) => async (dispatch) => {
  try {
    let res = await webService.getListClinicByProvince(province);
    if (res && res.errCode === 0) {
      dispatch(getListClinicByProvinceSuccess(res.data));
    } else {
      dispatch(getListClinicByProvinceFailed());
    }
  } catch (err) {
    dispatch(getListClinicByProvinceFailed());
    console.log(err);
  }
};
export const getListClinicByProvinceSuccess = (data) => ({
  type: actionTypes.FETCH_LIST_CINIC_BY_PROVINCE_SUCCESS,
  data,
});
export const getListClinicByProvinceFailed = () => ({
  type: actionTypes.FETCH_LIST_CINIC_BY_PROVINCE_FAILED,
});

// Lấy thông tin trong trang chi tiết bác sĩ
export const getListDoctorByProvinceStart = (province) => async (dispatch) => {
  try {
    let res = await webService.getListDoctorByProvince(province);
    if (res && res.errCode === 0) {
      dispatch(getListDoctorByProvinceSuccess(res.data));
    } else {
      dispatch(getListDoctorByProvinceFailed());
    }
  } catch (err) {
    dispatch(getListDoctorByProvinceFailed());
    console.log(err);
  }
};
export const getListDoctorByProvinceSuccess = (data) => ({
  type: actionTypes.FETCH_LIST_DOCTOR_BY_PROVINCE_SUCCESS,
  data,
});
export const getListDoctorByProvinceFailed = () => ({
  type: actionTypes.FETCH_LIST_DOCTOR_BY_PROVINCE_FAILED,
});
