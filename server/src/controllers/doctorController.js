// file này sẽ sử lí các action liên quan đến user
import doctorService from "../services/doctorService";
/** 
 * HTTP status:
 - 1xx (100 – 199): Phản hồi thông tin – Yêu cầu đã được chấp nhận và quá trình xử lý yêu cầu của bạn đang được tiếp tục.
 – 2xx (200 – 299): Phản hồi thành công – Yêu cầu của bạn đã được máy chủ tiếp nhận, hiểu và xử lý thành công.
 – 3xx (300 – 399): Điều hướng – Phía client cần thực hiện hành động bổ sung để hoàn tất yêu cầu.
 – 4xx (400 – 499): Lỗi phía client – Yêu cầu không thể hoàn tất hoặc yêu cầu chứa cú pháp không chính xác
 – 5xx (500 – 599): Lỗi phía máy chủ – Máy chủ không thể hoàn thành yêu cầu được cho là hợp lệ.
*/

// Xử lí in ra doctor ở trang home
const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let doctors = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(doctors);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server" });
  }
};

//  lấy tất cả thông tin doctor
const getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctorService();
    return res.status(200).json(doctors);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server" });
  }
};
// lưu thông tin chi tiết của doctor
const postInfoDoctor = async (req, res) => {
  try {
    let doctorDetail = await doctorService.saveDetailInfoDoctor(req.body);
    return res.status(200).json(doctorDetail);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server", error });
  }
};
//  lấy  thông tin doctor = id
const getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(info);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ", error });
  }
};
// Lấy dữ liệu markdown giới thiệu bản thân của doctor
const getDetailDoctorMarkDown = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorMarkDown(req.query.id);
    return res.status(200).json(info);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ", error });
  }
};
// lưu dữ liệu lịch khám
const blukCreateSchedule = async (req, res) => {
  try {
    let schedule = await doctorService.blukCreateSchedule(req.body);
    return res.status(200).json(schedule);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server", error });
  }
};
// Lấy dữ liệu lịch khám bệnh
const getScheduleDoctorByDate = async (req, res) => {
  try {
    let schedule = await doctorService.getScheduleDoctorByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(schedule);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server", error });
  }
};
// Lấy thông tin giá khám bệnh, các chi tiết khác
const getExtraInfoDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
    return res.status(200).json(info);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ", error });
  }
};
// lấy thông tin profile của doctor
const getProfileDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(info);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ", error });
  }
};

// list phòng khám theo tỉnh thành
let getListDoctorByProvince = async (req, res) => {
  try {
    let data = await doctorService.getListDoctorByProvince(req.query.province);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let data = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Gửi email và kết quả khám xong
let sendRemedy = async (req, res) => {
  try {
    let data = await doctorService.sendRemedy(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// lấy lịch sử khám bệnh
let getListBookingDoneForDoctor = async (req, res) => {
  try {
    let data = await doctorService.getListBookingDoneForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};


export default {
  getTopDoctorHome,
  getAllDoctor,
  postInfoDoctor,
  getDetailDoctorById,
  getDetailDoctorMarkDown,
  blukCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListDoctorByProvince,
  getListPatientForDoctor,
  sendRemedy,
  getListBookingDoneForDoctor,
};
