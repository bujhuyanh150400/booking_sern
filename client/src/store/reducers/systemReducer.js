import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  isLoading: false,
  position: [],
  roles: [],
  province: [],
  users: [],
  topDoctors: [],
  AllDoctor: [],
  dataUser: {},
  doctor: {},
  MarkdownDoctor: {},
  timeData: [],
  dataReqDoctor: [],
  dataAllClinic: {},
  dataAllSpecialty: {},
  resClinic: 1,
  resDeleteUser: 1,
  resDeleteClinic: 1,
  resEditClinic: 1,
  resSpecialty: 1,
  resSaveDetailDoctor: 1,
  resDeleteSpecialty: 1,
  resEditSpecialty: 1,
  listBooking: [],
  listBookingDone:[]
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    // ----------------- option all code -------------------- //
    //GENDER
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoading = false;
      state.gender = action.genderData;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoading = false;
      state.gender = [];
      return {
        ...state,
      };

    //POSITION
    case actionTypes.FETCH_POSITION_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoading = false;
      state.position = action.PositionData;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoading = false;
      state.position = [];
      return {
        ...state,
      };

    //ROLE
    case actionTypes.FETCH_ROLE_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoading = false;
      state.roles = action.RoleData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoading = false;
      state.roles = [];
      return {
        ...state,
      };

    // ----------------- CRUD Users -------------------- //
    // All Users
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.userData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    // Xóa user
    case actionTypes.DELETE_USER_SUCCESS:
      state.resDeleteUser = action.res;
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILED:
      state.resDeleteUser = 1;
      return {
        ...state,
      };

    // get user by id
    case actionTypes.FETCH_USER_BY_ID_SUCCESS:
      state.dataUser = action.userData;
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_BY_ID_FAILED:
      state.dataUser = {};
      return {
        ...state,
      };

    // ----------------- For Doctor -------------------- //
    // All Doctor
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.AllDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.actionTypes = [];
      return {
        ...state,
      };

    // Detail doctor by Id
    case actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_SUCCESS:
      state.doctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_DOCTOR_BY_ID_FAILED:
      state.doctor = {};
      return {
        ...state,
      };

    // Lấy thông tin Markdown để chỉnh sửa thông tin chi tiết của bác sĩ
    case actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS:
      state.MarkdownDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.GET_MARKDOWN_DOCTOR_FAILED:
      state.MarkdownDoctor = [];
      return {
        ...state,
      };

    //  Lấy thời gian đặt lịch khám bệnh
    case actionTypes.FETCH_SCHEDULE_TIMES_SUCCESS:
      state.timeData = action.timeData;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_TIMES_FAILED:
      state.dataTime = [];
      return {
        ...state,
      };

    // Lấy thông tin Bác sĩ (giá,payment,tỉnh thành)
    case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:
      state.dataReqDoctor = action.dataReqDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_FAILED:
      state.dataReqDoctor = [];
      return {
        ...state,
      };

    // Save detail doctor
    case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
      state.resSaveDetailDoctor = action.res;
      return {
        ...state,
      };
    case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
      state.resSaveDetailDoctor = 1;
      return {
        ...state,
      };

    // Lấy list booking
    case actionTypes.FETCH_LIST_PATIENT_FOR_DOCTOR_SUCCESS:
      state.listBooking = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_PATIENT_FOR_DOCTOR_FAILED:
      state.listBooking = [];
      return {
        ...state,
      };

    // Lấy dữ liệu các booking done
    case actionTypes.FETCH_LIST_BOOKING_DONE_SUCCESS:
      state.listBookingDone = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_LIST_BOOKING_DONE_FAILED:
      state.listBookingDone = [];
      return {
        ...state,
      };

    // ----------------- For clinic -------------------- //
    // Tạo phòng khám
    case actionTypes.CREATE_NEW_CLINIC_SUCCESS:
      state.resClinic = action.res;
      return {
        ...state,
      };
    case actionTypes.CREATE_NEW_CLINIC_FAILED:
      state.resClinic = 1;
      return {
        ...state,
      };
    // Lấy all thông tin clinics
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.dataAllClinic = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILED:
      state.dataAllClinic = {};
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

    // Xóa Clinic
    case actionTypes.DELETE_CLINIC_SUCCESS:
      state.resDeleteClinic = action.res;
      return {
        ...state,
      };
    case actionTypes.DELETE_CLINIC_FAILED:
      state.resDeleteClinic = 1;
      return {
        ...state,
      };

    // Edit clinic
    case actionTypes.EDIT_CLINIC_SUCCESS:
      state.resEditClinic = action.res;
      return {
        ...state,
      };
    case actionTypes.EDIT_CLINIC_FAILED:
      state.resEditClinic = 1;
      return {
        ...state,
      };

    // ----------------- For specialty -------------------- //
    // Tạo phòng khám
    case actionTypes.CREATE_NEW_SPECIALTY_SUCCESS:
      state.resSpecialty = action.res;
      return {
        ...state,
      };
    case actionTypes.CREATE_NEW_SPECIALTY_FAILED:
      state.resSpecialty = 1;
      return {
        ...state,
      };
    // Lấy all thông tin clinics
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.dataAllSpecialty = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
      state.dataAllSpecialty = {};
      return {
        ...state,
      };

    // Xóa specialty
    case actionTypes.DELETE_SPECIALTY_SUCCESS:
      state.resDeleteSpecialty = action.res;
      return {
        ...state,
      };
    case actionTypes.DELETE_SPECIALTY_FAILED:
      state.resDeleteSpecialty = 1;
      return {
        ...state,
      };
    // Edit specialty
    case actionTypes.EDIT_SPECIALTY_SUCCESS:
      state.resEditSpecialty = action.res;
      return {
        ...state,
      };
    case actionTypes.EDIT_SPECIALTY_FAILED:
      state.resEditSpecialty = 1;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default systemReducer;
