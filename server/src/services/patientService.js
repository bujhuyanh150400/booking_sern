import { v4 as uuidv4 } from "uuid";
import db from "../models";
import emailService from "./emailService";
require("dotenv").config();

// Build url for email
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

// Post lịch book khám bệnh
const postBookingAppointment = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.fullname ||
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.address ||
        !data.gender ||
        !data.date
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let token = uuidv4();
        // Email xác thực lịch khám
        await emailService.sendSimpleEmail({
          email: data.email,
          patientName: data.fullname,
          time: data.timeDate,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        // upsert (update or create)
        let user = await db.Users.findOrCreate({
          where: {
            email: data.email,
            fullname: data.fullname,
            phonenumber: data.phonenumber,
            address: data.address,
            gender: data.gender,
            roleId: "R3",
          },
          default: {
            roleId: "R3",
            email: data.email,
            fullname: data.fullname,
            phonenumber: data.phonenumber,
            address: data.address,
            gender: data.gender,
          },
          raw: true,
        });
        if (user && user[0]) {
          await db.Bookings.findOrCreate({
            where: {
              patientId: user[0].id,
              statusId: "S1",
              date: data.date,
              timeType: data.timeType,
              reason: data.reason,
              doctorId: data.doctorId,
              token: token,
            },
            default: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              reason: data.reason,
              token: token,
            },
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Save info patient successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Verify email
const postVerifyBookingAppointment = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appoiment = await db.Bookings.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
        });
        if (appoiment) {
          appoiment.statusId = "S2";
          await appoiment.save();
          resovle({
            errCode: 0,
            errMessage: "Update Apoiment successfully",
          });
        } else {
          resovle({
            errCode: 2,
            errMessage: "Appoiment has been activited",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Load thông tin khám bệnh của bệnh nhân
// lấy lịch sử khám bệnh
let getListBookingDoneForPatient = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!patientId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = [];
        data = await db.Bookings.findAll({
          where: {
            patientId,
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
            {
              model: db.Allcodes,
              as: "statusData",
              attributes: ["valueVI", "valueEN"],
            },
          ],
        });
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
  postBookingAppointment,
  postVerifyBookingAppointment,
  getListBookingDoneForPatient
};
