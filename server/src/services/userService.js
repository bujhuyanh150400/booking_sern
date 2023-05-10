// file này xử lí dữ liệu của user
import db from "../models";
import bcrypt from "bcryptjs";

// ----Các error code và error message ----//
/**
 *
 *
 */
// ----- Xử lí User ----- //
// check email exist hay ko
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userEmail = await db.Users.findOne({
        where: { email: email },
        //in ra thong tin email va roleid va password
        attributes: ["email", "roleId", "password", "fullname"],
        raw: true,
      });
      // kiểm tra xem email tồn tại hay ko
      if (userEmail) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Xử lí sự kiện login
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isEmailExist = await checkUserEmail(email);
      // nếu email tồn tại
      if (isEmailExist) {
        let user = await db.Users.findOne({
          where: { email: email },
          //in ra thong tin email va roleid va password
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          raw: true,
        });

        // Check user có tồn tại hay không
        if (user) {
          // Check password thông qua bcrypt
          let checkPassword = bcrypt.compareSync(password, user.password);

          // Check password
          if (checkPassword) {
            delete user.password;
            userData.errCode = 0;
            userData.errMessage = "Login successfully";
            // Xóa password khi đã check xong password để tránh lộ thông tin
            userData.user = user;
          } else {
            // Sai password
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          // Không thấy user trong database
          userData.errCode = 2;
          userData.errMessage = "User is not found in Database";
        }
      } else {
        // Không thấy email address trong database
        userData.errCode = 1;
        userData.errMessage = "Your's Email isn't exist in Database";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
// ----- get All Users ----- //
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let users = [];
        let user = {};
        if (userId && userId === "ALL") {
          users = await db.Users.findAll({
            // Bỏ trường passwords
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcodes,
                as: "roleData",
                attributes: ["valueEN", "valueVI"],
              },
            ],
            nest: true,
          });
          if (users && users.length > 0) {
            users.map((item) => {
              if (item.image === null) {
                return item;
              } else {
                item.image = new Buffer(item.image, "base64").toString(
                  "binary"
                );
                return item;
              }
            });
          }
          resolve({
            errCode: 0,
            errMessage: "get all user success",
            userData: users,
          });
        }
        if (userId && userId !== "ALL") {
          user = await db.Users.findOne({
            where: { id: userId },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["valueEN", "valueVI"],
              },
              {
                model: db.Allcodes,
                as: "roleData",
                attributes: ["valueEN", "valueVI"],
              },
            ],
            nest: true,
          });

          resolve({
            errCode: 0,
            errMessage: "get user success",
            userData: user,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
// ------ CREATE user ------ //
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let checkEmail = await checkUserEmail(data.email);
    try {
      if (checkEmail) {
        resolve({
          errCode: 1,
          errMessage: "Emai đã tồn tại, vui lòng nhập email khác",
        });
      } else {
        // chọc tới DB để tạo người dùng mới
        let salt = await bcrypt.genSaltSync(10); // tạo 1 hash password 10 kí tự
        let hashPassword = await bcrypt.hashSync(data.password, salt); // hash password
        await db.Users.create({
          fullname: data.fullname,
          password: hashPassword,
          email: data.email,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.role,
          positionId: data.position,
          image: data.avatar,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "New User has been created",
      });
    } catch (error) {
      reject(error);
    }
  });
};
// ------ UPDATE user ------- //
// tìm id user
let getIdUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getUserById = db.Users.findOne({
        where: { id: userId },
        raw: true,
      });
      // Nếu tồn tại sẽ trả về thông tin user đó
      if (getUserById) {
        resolve(getUserById);
      } else {
        // còn không sẽ trả về 1 obj rỗng
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Hãy điền đủ thông tin",
        });
      }
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Không tìm thấy user",
        });
      }
      let user = await db.Users.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.fullname = data.fullname;
        user.address = data.address;
        user.roleId = data.role;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;
        if (data.avatar) {
          user.image = data.avatar;
        }

        await user.save();
        resolve({
          errCode: 0,
          errMessage: "update user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "user not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// ------ DELETE user ------ //
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Không có thông tin ID",
        });
      } else {
        let user = await db.Users.findOne({ where: { id: userId } });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: "Không tìm thấy User",
          });
        }
        if (user) {
          await user.destroy();
          resolve({
            errCode: 0,
            errMessage: "Đã xóa thành công",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ----- Xử lí Allcode ----- //
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allCodes = await db.Allcodes.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCodes;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Xử lí đăng kí người dùng mới
let handleSignUp = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.password ||
        !data.fullname ||
        !data.phonenumber ||
        !data.address ||
        !data.gender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let checkEmail = await checkUserEmail(data.email);
        if (checkEmail) {
          resolve({
            errCode: 3,
            errMessage: "Email already exists",
          });
        } else {
          // chọc tới DB để tạo người dùng mới
          let salt = await bcrypt.genSaltSync(10); // tạo 1 hash password 10 kí tự
          let hashPassword = await bcrypt.hashSync(data.password, salt); // hash password
          await db.Users.create({
            fullname: data.fullname,
            password: hashPassword,
            email: data.email,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender,
            roleId: "R3",
            positionId: null,
            image: data.avatar,
          });
          resolve({
            errCode: 0,
            errMessage: "New User has been created",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
export default {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getIdUser,
  getAllCodeService,
  handleSignUp,
};
