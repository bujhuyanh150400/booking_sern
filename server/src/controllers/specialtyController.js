// file này sẽ sử lí các action liên quan đến user
import specialtyServer from "../services/specialtyServer";

/** 
 * HTTP status:
 - 1xx (100 – 199): Phản hồi thông tin – Yêu cầu đã được chấp nhận và quá trình xử lý yêu cầu của bạn đang được tiếp tục.
 – 2xx (200 – 299): Phản hồi thành công – Yêu cầu của bạn đã được máy chủ tiếp nhận, hiểu và xử lý thành công.
 – 3xx (300 – 399): Điều hướng – Phía client cần thực hiện hành động bổ sung để hoàn tất yêu cầu.
 – 4xx (400 – 499): Lỗi phía client – Yêu cầu không thể hoàn tất hoặc yêu cầu chứa cú pháp không chính xác
 – 5xx (500 – 599): Lỗi phía máy chủ – Máy chủ không thể hoàn thành yêu cầu được cho là hợp lệ.
*/
// Tạo mới chuyên khoa
let createNewSpecialty = async (req, res) => {
  try {
    let data = await specialtyServer.createNewSpecialty(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Lấy All thông tin về chuyên khoa
let getAllSpecialty = async (req, res) => {
  try {
    let data = await specialtyServer.getAllSpecialty();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Lấy thông tin trong trang chi tiết chuyên khoa
let getDetailSpecialtyById = async (req, res) => {
  try {
    let data = await specialtyServer.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Xử lí xóa chuyên khoa
let handleDeleteSpecialty = async (req, res) => {
  try {
    let data = await specialtyServer.handleDeleteSpecialty(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
// Xử lí chỉnh sửa chuyên khoa
let handleUpdateSpecialty = async (req, res) => {
  try {
    let data = await specialtyServer.handleUpdateSpecialty(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
export default {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  handleDeleteSpecialty,
  handleUpdateSpecialty,
};
