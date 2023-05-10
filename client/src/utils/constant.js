export const path = {
  HOMEPAGE: "/home",
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOG_OUT: "/logout",
  // system - admin
  SYSTEM: "/system",
  HOMEPAGE_SYSTEM:"/system/landinghome",
  MANAGER_SYSTEM: "/system/user-manage",
  MANAGER_DOCTOR: "/system/manager-doctor",
  USER_REDUX: "/system/user-redux",
  MANAGER_SPECIALTY: "/system/manager-specialty",
  MANAGER_CLINIC: "/system/manager-clinic",
  MANAGER_SCHEDULE: "/system/manager-schedule",

  // system - doctor
  DOCTOR: "/doctor",
  HOMEPAGE_DOCTOR:"/doctor/landinghome",
  EDIT_INFO_DOCTOR:"/doctor/edit_info",
  EDIT_INFO_DETAIL_DOCTOR:"/doctor/edit_info_detail_doctor",
  MANAGER_SCHEDULE_FOR_DOCTOR: "/doctor/manager-schedule",
  HISTORY_BOOKING: "/doctor/history_booking",
  MANAGER_PATIENT_SCHEDULE: "/doctor/manager-patient",

  // system - patient
  PATIENT: "/patient",
  HOMEPAGE_PATIENT:"/patient/landinghome",
  EDIT_INFO_PATIENT:"/patient/edit_info",
  BOOKING_FOR_PATIENT: "/patient/booking_for_patient",


  // homepage
  LIST_DOCTOR: "/list-doctor",
  LIST_CLINIC: "/list-clinic",
  LIST_SPECIALTY: "/list-specialty",
  DETAIL_DOCTOR: "/list-doctor/detail-doctor/:id",
  DETAIL_SPECIALTY: "/list-specialty/detail-specialty/:id",
  DETAIL_CLINIC: "/list-clinic/detail-clinic/:id",
  DETAIL_DOCTOR_ID: "/list-doctor/detail-doctor/",
  DETAIL_SPECIALTY_ID: "/list-specialty/detail-specialty/",
  DETAIL_CLINIC_ID: "/list-clinic/detail-clinic/",
  VERIFY_EMAIL: "/verify-booking",
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const DATE_FOMAT = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
};
