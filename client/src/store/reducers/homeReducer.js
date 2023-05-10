import actionTypes from "../actions/actionTypes";

const initialState = {
  topDoctors: {},
  topSpecialties: {},
  detailSpecialtyData: [],
  detailClinicData: [],
  province: [],
  listClinic: [],
  listDoctor: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch bác sĩ hiển thị ở trên home page
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };

    // Lấy All thông tin về chuyên khoa
    case actionTypes.FETCH_TOP_SPECIALTIES_SUCCESS:
      state.topSpecialties = action.topSpecialties;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_SPECIALTIES_FAILED:
      state.topSpecialties = [];
      return {
        ...state,
      };

    // Lấy thông tin trong trang chi tiết chuyên khoa
    case actionTypes.FETCH_DETAIL_SPECIALTY_BY_ID_SUCCESS:
      state.detailSpecialtyData = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_SPECIALTY_BY_ID_FAILED:
      state.detailSpecialtyData = [];
      return {
        ...state,
      };

    // Lấy thông tin tỉnh thành
    case actionTypes.FETCH_PROVINCE_SUCCESS:
      state.province = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_FAILED:
      state.province = [];
      return {
        ...state,
      };

    // Lấy thông tin trong trang chi tiết chuyên khoa
    case actionTypes.FETCH_DETAIL_CLINIC_BY_ID_SUCCESS:
      state.detailClinicData = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_CLINIC_BY_ID_FAILED:
      state.detailClinicData = [];
      return {
        ...state,
      };

    // Lấy thông tin trong trang chi tiết phòng khám
    case actionTypes.FETCH_LIST_CINIC_BY_PROVINCE_SUCCESS:
      state.listClinic = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_CINIC_BY_PROVINCE_FAILED:
      state.detailClinicData = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_LIST_DOCTOR_BY_PROVINCE_SUCCESS:
      state.listDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_DOCTOR_BY_PROVINCE_FAILED:
      state.detailClinicData = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default homeReducer;
