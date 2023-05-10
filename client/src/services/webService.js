import axios from "../axios";

const webService = {
  // ----- User ----- //
  // xử lí login user
  handleLogin(email, password) {
    return axios.post("/api/login", { email: email, password: password });
  },
  // xử lí lấy dữ liệu all user
  getAllUsers(inputId) {
    return axios.get("/api/get-all-users", {
      // Xử dụng query parameters
      params: {
        id: inputId,
      },
    });
  },
  // xử lí thêm người dùng
  postNewUser(inputData) {
    return axios.post("/api/create-new-user", inputData);
  },
  // xử lí edit người dùng
  editUser(inputData) {
    return axios.put("/api/update-user", inputData);
  },
  // xử lí xóa người dùng
  deleteUser(userId) {
    return axios.delete("/api/delete-user", {
      // sử dụng body parameter
      data: {
        id: userId,
      },
    });
  },
  // xử lí thêm người dùng
  handleSignUp(data) {
    return axios.post("/api/sign-up", data);
  },
  // ----- Allcode ----- //
  // Allcode
  getAllCodeService(inputType) {
    return axios.get(`api/allcode?type=${inputType}`);
  },
  // ----- Doctor ----- //
  // Hiển thị bác sĩ nổi bật
  getTopDoctorHomeService(limit) {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
  },
  // Lấy tất cả thông tin của bác sĩ
  getAllDoctor() {
    return axios.get(`/api/get-all-doctor`);
  },
  // save thông tin cho doctor
  saveDetailDoctor(data) {
    return axios.post(`/api/save-info-doctor`, data);
  },
  getDetailDoctorById(id) {
    return axios.get(`/api/get-detail-doctor?id=${id}`);
  },
  // Lấy thông tin Markdown để chỉnh sửa thông tin chi tiết của bác sĩ
  getDetailDoctorMarkDown(doctorId) {
    return axios.get(`/api/get-markdown-doctor?id=${doctorId}`);
  },
  // lưu dữ liệu lịch khám
  saveBulkScheduleDoctor(data) {
    return axios.post(`/api/bluk-create-schedule`, data);
  },
  // Lấy lịch khám
  getScheduleDoctorByDate(doctorId, date) {
    return axios.get(
      `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
  },
  // Lấy thông tin giá khám bệnh, các chi tiết khác
  getExtraInfoDoctorById(doctorId) {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
  },
  // Lấy thông tin profile doctor
  getProfileDoctorById(doctorId) {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
  },
  // list doctor theo tỉnh thành
  getListDoctorByProvince(province) {
    return axios.get(`/api/get-list-doctor-by-province?province=${province}`);
  },
  // đăng kí lịch khám bệnh
  postBookingAppointment(data) {
    return axios.post(`/api/patient-book-appointment`, data);
  },
  // Verify email
  postVerifyBookingAppointment(data) {
    return axios.post(`/api/verify-book-appointment`, data);
  },
  // Lấy danh sách lịch hẹn booking
  getListPatientForDoctor(doctorId, date) {
    return axios.get(
      `/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
    );
  },
  postSendRemedy(data) {
    return axios.post(`/api/send-remedy`, data);
  },
  getListBookingDoneForDoctor(doctorId, date) {
    return axios.get(
      `/api/get-list-booking-done-for-doctor?doctorId=${doctorId}&date=${date}`
    );
  },
  // ----- Specialty ----- //
  // Tạo mới 1 chuyên khoa
  createNewSpecialty(data) {
    return axios.post(`/api/create-new-specialty`, data);
  },
  // Lấy All thông tin về chuyên khoa
  getAllSpecialty() {
    return axios.get(`/api/get-all-specialties`);
  },
  // Lấy thông tin trong trang chi tiết chuyên khoa
  getDetailSpecialtyById(data) {
    return axios.get(
      `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
  },
  // xử lí xóa specialty
  handleDeleteSpecialty(userId) {
    return axios.delete("/api/delete-specialty", {
      data: {
        id: userId,
      },
    });
  },
  // xử lí edit specialty
  handleUpdateSpecialty(inputData) {
    return axios.put("/api/update-specialty", inputData);
  },
  // ----- Clinic ----- //
  // Tạo clinic mới
  createNewClinic(data) {
    return axios.post(`/api/create-new-clinic`, data);
  },
  // Lấy All clinic
  getAllClinic() {
    return axios.get("/api/get-all-clinic");
  },
  // xử lí xóa người dùng
  handleDeleteClinic(userId) {
    return axios.delete("/api/delete-clinic", {
      // sử dụng body parameter
      data: {
        id: userId,
      },
    });
  },
  // xử lí edit người dùng
  handleUpdateClinic(inputData) {
    return axios.put("/api/update-clinic", inputData);
  },
  // Lấy chi tiết phòng khám
  getDetailClinicById(data) {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
  },
  // list phòng khám theo tỉnh thành
  getListClinicByProvince(province) {
    return axios.get(`/api/get-list-clinic-by-province?province=${province}`);
  },

  // ----- patient ----- //
  getListBookingDoneForPatient(id) {
    return axios.get(`/api/get-booking-for-patient?id=${id}`);
  },
};

export default webService;
