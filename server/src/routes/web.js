import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
// Đặt 1 biến làm route
let router = express.Router();

// khởi tạo web route để liên kết đường link
let initWebRoutes = (app) => {
  // ----- web API User ----- //
  // Xử lí login
  router.post("/api/login", userController.handleLogin);
  // CREATE user
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  // READ user
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  // UPDATE user
  router.put("/api/update-user", userController.handleUpdateUser);
  // DELETE user
  router.delete("/api/delete-user", userController.handleDeleteUser);
  // sign up user 
  router.post("/api/sign-up", userController.handleSignUp);

  // ----- web API Allcode ----- //
  router.get("/api/allcode", userController.getAllCode);

  // ----- web API Doctor ----- //
  // Lấy thông tin bác sĩ in ra homepage
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  // Lấy tất cả thông tin của bác sĩ
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  // Lưu thông tin chi tiết của bác sĩ
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
  // Lấy thông tin chi tiết của bác sĩ (in ra trang giới thiệu bác sĩ)
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctorById);
  // Lấy thông tin Markdown để chỉnh sửa thông tin chi tiết của bác sĩ
  router.get(
    "/api/get-markdown-doctor",
    doctorController.getDetailDoctorMarkDown
  );
  // Tạo lịch khám
  router.post("/api/bluk-create-schedule", doctorController.blukCreateSchedule);
  // Lấy lịch khám
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleDoctorByDate
  );
  // Lấy thông tin giá khám bệnh, các chi tiết khác
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  // Lấy thông tin profile doctor
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  // list phòng khám theo tỉnh thành
  router.get(
    "/api/get-list-doctor-by-province",
    doctorController.getListDoctorByProvince
  );
  // Lấy lịch hẹn của bệnh nhân
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  // Gửi email và kết quả khám xong
  router.post("/api/send-remedy", doctorController.sendRemedy);
  // lấy lịch sử khám bệnh
  router.get(
    "/api/get-list-booking-done-for-doctor",
    doctorController.getListBookingDoneForDoctor
  );
  // ----- web API Patient ----- //
  // Đặt lịch khám bệnh
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookingAppointment
  );
  // Xác nhận verify booking apoiment
  router.post(
    "/api/verify-book-appointment",
    patientController.postBookingAppointment
  );
  // Load lịch khám bệnh của bệnh nhân
  router.get(
    "/api/get-booking-for-patient",
    patientController.getListBookingDoneForPatient
  );
  // ----- web API Speciality ----- //
  // Tạo mới 1 chuyên khoa
  router.post(
    "/api/create-new-specialty",
    specialtyController.createNewSpecialty
  );
  // Lấy All thông tin về chuyên khoa
  router.get("/api/get-all-specialties", specialtyController.getAllSpecialty);
  // Xóa specialty
  router.delete(
    "/api/delete-specialty",
    specialtyController.handleDeleteSpecialty
  );
  // edit specialty
  router.put(
    "/api/update-specialty",
    specialtyController.handleUpdateSpecialty
  );
  // Lấy thông tin trong trang chi tiết chuyên khoa
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  // ----- web API Clinic ----- //
  // Tạo mới 1 chuyên khoa
  router.post("/api/create-new-clinic", clinicController.createNewClinic);
  // Lấy All thông tin về chuyên khoa
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  // Xóa phòng khám
  router.delete("/api/delete-clinic", clinicController.handleDeleteClinic);
  // edit clinic
  router.put("/api/update-clinic", clinicController.handleUpdateClinic);
  // Lấy thông tin trong trang chi tiết phòng khám
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  // list phòng khám theo tỉnh thành
  router.get(
    "/api/get-list-clinic-by-province",
    clinicController.getListClinicByProvince
  );

  return app.use("/", router);
};
export default initWebRoutes;
