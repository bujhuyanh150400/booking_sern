import { path } from "../../../utils";

export const adminMenu = [
  //Admin
  // Quản lý người dùng
  {
    name: "menu.Admin_role.manager-user.title",
    menus: [
      {
        name: "menu.Admin_role.manager-user.doctor",
        link: path.MANAGER_DOCTOR,
      },
      {
        name: "menu.Admin_role.manager-user.user",
        link: path.USER_REDUX,
      },
    ],
  },
  //   quản lý phòng khám
  {
    name: "menu.Admin_role.manager-clinic.title",
    menus: [
      {
        name: "menu.Admin_role.manager-clinic.clinics",
        link: path.MANAGER_CLINIC,
      },
      // Quản lí lịch khám bệnh
      {
        name: "menu.Doctor_role.manager-schedule.schedule",
        link: path.MANAGER_SCHEDULE,
      },
    ],
  },
  //   quản lý chuyên khoa
  {
    name: "menu.Admin_role.manager-specialty.title",
    menus: [
      {
        name: "menu.Admin_role.manager-specialty.specialtys",
        link: path.MANAGER_SPECIALTY,
      },
    ],
  },
];
export const doctorMenu = [
  //Doctor
  // Thoong tin lý lịch
  {
    name: "menu.Doctor_role.manager-info.title",
    menus: [
      {
        name: "menu.Doctor_role.manager-info.edit_user",
        link: path.EDIT_INFO_DOCTOR,
      },
      {
        name: "menu.Doctor_role.manager-info.edit_info",
        link: path.EDIT_INFO_DETAIL_DOCTOR,
      },
    ],
  },
  // Quản lý lịch khám bệnh
  {
    name: "menu.Doctor_role.manager-schedule.title",
    menus: [
      // Lịch khám
      {
        name: "menu.Doctor_role.manager-schedule.schedule",
        link: path.MANAGER_SCHEDULE_FOR_DOCTOR,
      },
      {
        name: "menu.Doctor_role.manager-patient.patient",
        link: path.MANAGER_PATIENT_SCHEDULE,
      },
      {
        name: "menu.Doctor_role.manager-patient.history",
        link: path.HISTORY_BOOKING,
      },
    ],
  },
];
export const patientMenu = [
  // patient
  // Thông tin lý lịch
  {
    name: "menu.Patient_role.manager-info.title",
    menus: [
      {
        name: "menu.Patient_role.manager-info.edit_user",
        link: path.EDIT_INFO_PATIENT,
      },
    ],
  },
  // Quản lý lịch khám bệnh
  {
    name: "menu.Patient_role.manager-booking.title",
    menus: [
      {
        name: "menu.Patient_role.manager-booking.booking",
        link: path.BOOKING_FOR_PATIENT,
      },
    ],
  },
];
