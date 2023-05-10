// file này sẽ sử lí các action liên quan đến user
import clinicService from "../services/clinicService";

/** 
 * HTTP status:
 - 1xx (100 – 199): Phản hồi thông tin – Yêu cầu đã được chấp nhận và quá trình xử lý yêu cầu của bạn đang được tiếp tục.
 – 2xx (200 – 299): Phản hồi thành công – Yêu cầu của bạn đã được máy chủ tiếp nhận, hiểu và xử lý thành công.
 – 3xx (300 – 399): Điều hướng – Phía client cần thực hiện hành động bổ sung để hoàn tất yêu cầu.
 – 4xx (400 – 499): Lỗi phía client – Yêu cầu không thể hoàn tất hoặc yêu cầu chứa cú pháp không chính xác
 – 5xx (500 – 599): Lỗi phía máy chủ – Máy chủ không thể hoàn thành yêu cầu được cho là hợp lệ.
*/
// Tạo mới phòng khám
let createNewClinic = async (req, res) => {
  try {
    let data = await clinicService.createNewClinic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};

// Lấy All thông tin về phòng khám
let getAllClinic = async (req, res) => {
  try {
    let data = await clinicService.getAllClinic();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Xoá phòng khám
let handleDeleteClinic = async (req, res) => {
  try {
    let data = await clinicService.handleDeleteClinic(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// chỉnh sửa phòng khám
let handleUpdateClinic = async (req, res) => {
  try {
    let data = await clinicService.handleUpdateClinic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Lấy thông tin trong trang chi tiết phòng khám
let getDetailClinicById = async (req, res) => {
  try {
    let data = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// list phòng khám theo tỉnh thành
let getListClinicByProvince = async (req, res) => {
  try {
    let data = await clinicService.getListClinicByProvince(req.query.province);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
export default {
  createNewClinic,
  getAllClinic,
  handleDeleteClinic,
  handleUpdateClinic,
  getDetailClinicById,
  getListClinicByProvince,
};
