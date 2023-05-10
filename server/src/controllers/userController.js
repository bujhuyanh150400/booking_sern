// file này sẽ sử lí các action liên quan đến user
import userService from "../services/userService";

/** 
 * HTTP status:
 - 1xx (100 – 199): Phản hồi thông tin – Yêu cầu đã được chấp nhận và quá trình xử lý yêu cầu của bạn đang được tiếp tục.
 – 2xx (200 – 299): Phản hồi thành công – Yêu cầu của bạn đã được máy chủ tiếp nhận, hiểu và xử lý thành công.
 – 3xx (300 – 399): Điều hướng – Phía client cần thực hiện hành động bổ sung để hoàn tất yêu cầu.
 – 4xx (400 – 499): Lỗi phía client – Yêu cầu không thể hoàn tất hoặc yêu cầu chứa cú pháp không chính xác
 – 5xx (500 – 599): Lỗi phía máy chủ – Máy chủ không thể hoàn thành yêu cầu được cho là hợp lệ.
*/

/** ------ Validate login ----- //
 * Kiểm tra xem người dùng đã nhập thông tin chưa
 * Kiểm tra xem Email tồn tại hay không
 * So sánh password
 * => Return
 *  + user info
 *  + access token: JWT (JSON web token : cơ chế bảo mật)
 */
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // Check xem có nhập email và password ko
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing inputs, pls check again!!!",
    });
  }
  //lấy userData sau khi sử lí service
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// ------ READ: lấy tất cả user data ------ //
let handleGetAllUsers = async (req, res) => {
  try {
    let data = await userService.getAllUsers(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(202).json({
      errCode: 1,
      errorMessage: "Error from server",
    });
  }
};

// ------ CREATE: tạo mới user ------ //
let handleCreateNewUser = async (req, res) => {
  let data = req.body;
  let message = await userService.createNewUser(data);
  return res.status(200).json(message);
};

// ------ UPDATE: edit user ------ //
let handleUpdateUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};

// ------ DELETE: xóa user ------ //
let handleDeleteUser = async (req, res) => {
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

// ------ GET: lấy dữ liệu AllCode ------ //
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(202).json({
      errCode: 1,
      errorMessage: "Error from server",
    });
  }
};

// Đăng kí người dùng mới
let handleSignUp = async (req, res) => {
  try {
    let data = await userService.handleSignUp(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Error form Server ...", error });
  }
};
export default {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleUpdateUser,
  handleDeleteUser,
  getAllCode,
  handleSignUp
};
