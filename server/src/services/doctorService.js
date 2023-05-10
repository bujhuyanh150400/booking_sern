// file này xử lí dữ liệu của user
import db from "../models";
require("dotenv").config();
const MAX_NUMBER_SCHEDULES = process.env.MAX_NUMBER_SCHEDULES;
import _, { reject } from "lodash";
import emailService from "./emailService";

// Xử lí in ra doctor ở trang home
const getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.Users.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
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
            model: db.Doctor_infos,
            attributes: {
              exclude: [
                "id",
                "doctorId",
                "clinicId",
                "priceId",
                "provinceId",
                "paymentId",
                "note",
                "count",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: db.Specialties,
                attributes: {
                  exclude: [
                    "contentHTMLIntro",
                    "contentMarkDownIntro",
                    "image",
                    "createdAt",
                    "paymentId",
                    "updatedAt",
                  ],
                },
              },
            ],
          },
        ],
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
//  lấy tất cả thông tin doctor
const getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.Users.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};
// Lưu thông tin doctor
const saveDetailInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.doctorId ||
        !data.contentHTMLIntro ||
        !data.contentMarkDownIntro ||
        !data.contentHTMLDesc ||
        !data.contentMarkDownDesc ||
        !data.action ||
        !data.priceId ||
        !data.provinceId ||
        !data.paymentId ||
        !data.specialtyId ||
        !data.clinicId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter",
          data,
        });
      } else {
        if (data.action === "CREATE") {
          await db.Markdowns.create({
            contentHTMLIntro: data.contentHTMLIntro,
            contentMarkDownIntro: data.contentMarkDownIntro,
            contentHTMLDesc: data.contentHTMLDesc,
            contentMarkDownDesc: data.contentMarkDownDesc,
            doctorId: data.doctorId,
          });
          await db.Doctor_infos.create({
            doctorId: data.doctorId,
            priceId: data.priceId,
            provinceId: data.provinceId,
            paymentId: data.paymentId,
            specialtyId: data.specialtyId,
            clinicId: data.clinicId,

            note: data.note,
          });
        } else if (data.action === "EDIT") {
          let doctorMarkDown = await db.Markdowns.findOne({
            where: { doctorId: data.doctorId },
          });
          let doctorInfo = await db.Doctor_infos.findOne({
            where: { doctorId: data.doctorId },
          });
          if (doctorMarkDown && doctorInfo) {
            doctorMarkDown.contentHTMLIntro = data.contentHTMLIntro;
            doctorMarkDown.contentMarkDownIntro = data.contentMarkDownIntro;
            doctorMarkDown.contentHTMLDesc = data.contentHTMLDesc;
            doctorMarkDown.contentMarkDownDesc = data.contentMarkDownDesc;
            doctorInfo.priceId = data.priceId;
            doctorInfo.provinceId = data.provinceId;
            doctorInfo.paymentId = data.paymentId;
            doctorInfo.clinicId = data.clinicId;
            doctorInfo.specialtyId = data.specialtyId;
            doctorInfo.note = data.note;
            await doctorInfo.save();
            await doctorMarkDown.save();
          }
        }
        resolve({
          errCode: 0,
          errMessage: "save infomation Doctor successfully ",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// lấy thông tin của bác sĩ
const getDetailDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataInfo = await db.Users.findOne({
          where: {
            id: doctorId,
          },
          attributes: {
            exclude: ["password", "image"],
          },
          include: [
            {
              model: db.Markdowns,
              attributes: [
                "contentHTMLIntro",
                "contentMarkDownIntro",
                "contentHTMLDesc",
                "contentMarkDownDesc",
              ],
            },
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Doctor_infos,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "priceType",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceType",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentType",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Clinics,
                },
                {
                  model: db.Specialties,
                },
              ],
            },
          ],
          nest: true,
        });
        if (dataInfo && dataInfo.image) {
          dataInfo.image = new Buffer(dataInfo.image, "base64").toString(
            "binary"
          );
        }
        if (!dataInfo) dataInfo = {};
        resolve({
          errCode: 0,
          data: dataInfo,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// lấy thông tin để chỉnh sửa bác sĩ
const getDetailDoctorMarkDown = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataInfo = await db.Users.findOne({
          where: {
            id: doctorId,
          },
          attributes: {
            exclude: [
              "password",
              "email",
              "address",
              "gender",
              "image",
              "phonenumber",
              "roleId",
              "positionId",
              "fullname",
              "createdAt",
              "updatedAt",
              "id",
            ],
          },
          include: [
            {
              model: db.Markdowns,
              attributes: [
                "contentHTMLDesc",
                "contentMarkDownDesc",
                "contentHTMLIntro",
                "contentMarkDownIntro",
              ],
            },
          ],
          nest: true,
        });
        resolve({
          errCode: 0,
          data: dataInfo,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// lưu thông tin lịch khám
const blukCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedules || !data.doctorId || !data.fomattedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        // Thêm giới hạn đặt lịch
        let schedulesArr = data.arrSchedules;
        if (schedulesArr && schedulesArr.length > 0) {
          schedulesArr.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULES;
            return item;
          });
        }
        // lấy tất cả db bị trùng
        let existingSchedule = await db.Schedules.findAll({
          where: { doctorId: data.doctorId, date: data.fomattedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        // So sánh giá trị trùng
        let createData = _.differenceWith(
          schedulesArr,
          existingSchedule,
          (schedulesArr, existingSchedule) => {
            return (
              schedulesArr.timeType === existingSchedule.timeType &&
              // Convert sang number
              +schedulesArr.date === +existingSchedule.date
            );
          }
        );
        // Tạo lịch khám
        if (createData && createData.length > 0) {
          await db.Schedules.bulkCreate(createData);
          resolve({
            errCode: 0,
            errMessage: "Create successfully completed",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Error creating",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy lịch khám
const getScheduleDoctorByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "missing required parameter",
        });
      } else {
        let data = await db.Schedules.findAll({
          where: {
            doctorId,
            date,
          },
          include: [
            {
              model: db.Allcodes,
              as: "timeTypeData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Users,
              as: "doctorData",
              attributes: ["fullname"],
            },
          ],
          nest: true,
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy thông tin giá khám bệnh, các chi tiết khác
const getExtraInfoDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Doctor_infos.findOne({
          where: { doctorId: doctorId },
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcodes,
              as: "priceType",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcodes,
              as: "provinceType",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Allcodes,
              as: "paymentType",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Clinics,
            },
            {
              model: db.Specialties,
            },
          ],
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// lấy thông tin profile của doctor
const getProfileDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataInfo = await db.Users.findOne({
          where: {
            id: doctorId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdowns,
              attributes: ["contentHTMLDesc", "contentMarkDownDesc"],
            },
            {
              model: db.Allcodes,
              as: "positionData",
              attributes: ["valueEN", "valueVI"],
            },
            {
              model: db.Doctor_infos,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "priceType",
                  attributes: ["valueEN", "valueVI"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceType",
                  attributes: ["valueEN", "valueVI"],
                },
              ],
            },
          ],
          nest: true,
        });
        if (dataInfo && dataInfo.image) {
          dataInfo.image = new Buffer(dataInfo.image, "base64").toString(
            "binary"
          );
        }
        if (!dataInfo) dataInfo = {};
        resolve({
          errCode: 0,
          data: dataInfo,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// list phòng khám theo tỉnh thành
let getListDoctorByProvince = (provinceInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!provinceInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataDoctor = {};
        if (provinceInput === "ALL") {
          dataDoctor = await db.Users.findAll({
            where: {
              roleId: "R2",
            },
            attributes: ["id", "roleId"],
          });
        } else {
          // tìm vị trí
          dataDoctor = await db.Users.findAll({
            where: {
              roleId: "R2",
            },
            attributes: ["id", "roleId"],
            include: [
              {
                model: db.Doctor_infos,
                where: {
                  provinceId: provinceInput,
                },
                attributes: ["id"],
              },
            ],
            nest: true,
          });
        }
        dataDoctor.map((item) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }
          return item;
        });
        resolve({
          errCode: 0,
          errMessage: "Get Doctor successfully",
          data: dataDoctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy danh sách lịch hẹn booking
let getListPatientForDoctor = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Bookings.findAll({
          where: {
            statusId: "S2",
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Users,
              as: "patientData",
              attributes: [
                "email",
                "fullname",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcodes,
                  as: "genderData",
                  attributes: ["valueVI", "valueEN"],
                },
              ],
            },
            {
              model: db.Allcodes,
              as: "timeTypeBookingData",
              attributes: ["valueVI", "valueEN"],
            },
          ],
        });
        resolve({
          errCode: 0,
          errMessage: "Get Doctor successfully",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Gửi email và set đã khám xong
let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        // Gửi email
        await emailService.sendAttachment(data);
        let appointment = await db.Bookings.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: "S2",
          },
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }
        resolve({
          errCode: 0,
          errMessage: "Get Doctor successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// lấy lịch sử khám bệnh
let getListBookingDoneForDoctor = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = []
        if (date === "ALL") {
          data = await db.Bookings.findAll({
            where: {
              statusId: "S3",
              doctorId: doctorId,
            },
            include: [
              {
                model: db.Users,
                as: "patientData",
                attributes: [
                  "email",
                  "fullname",
                  "address",
                  "gender",
                  "phonenumber",
                ],
                include: [
                  {
                    model: db.Allcodes,
                    as: "genderData",
                    attributes: ["valueVI", "valueEN"],
                  },
                ],
              },
              {
                model: db.Allcodes,
                as: "timeTypeBookingData",
                attributes: ["valueVI", "valueEN"],
              },
            ],
          });
        } else {
          data = await db.Bookings.findAll({
            where: {
              statusId: "S3",
              doctorId: doctorId,
              date: date,
            },
            include: [
              {
                model: db.Users,
                as: "patientData",
                attributes: [
                  "email",
                  "fullname",
                  "address",
                  "gender",
                  "phonenumber",
                ],
                include: [
                  {
                    model: db.Allcodes,
                    as: "genderData",
                    attributes: ["valueVI", "valueEN"],
                  },
                ],
              },
              {
                model: db.Allcodes,
                as: "timeTypeBookingData",
                attributes: ["valueVI", "valueEN"],
              },
            ],
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Get bookings successfully",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getTopDoctorHome,
  getAllDoctorService,
  saveDetailInfoDoctor,
  getDetailDoctorById,
  getDetailDoctorMarkDown,
  blukCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListDoctorByProvince,
  getListPatientForDoctor,
  sendRemedy,
  getListBookingDoneForDoctor
};
