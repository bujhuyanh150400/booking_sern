import db from "../models";
// Tạo mới chuyên khoa
let createNewClinic = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.contentHTMLIntro ||
        !data.contentMarkDownIntro ||
        !data.provinceId
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
          data,
        });
      } else {
        await db.Clinics.create({
          name: data.name,
          image: data.image,
          address: data.address,
          contentHTMLIntro: data.contentHTMLIntro,
          contentMarkDownIntro: data.contentMarkDownIntro,
          provinceId: data.provinceId,
        });
        resovle({
          errCode: 0,
          errMessage: "Create Clinic Successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy All thông tin về phòng khám
let getAllClinic = () => {
  return new Promise(async (resovle, reject) => {
    try {
      let data = await db.Clinics.findAndCountAll({
        include: [
          {
            model: db.Allcodes,
            as: "provinceData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
      });
      if (data && data.rows.length > 0) {
        data.rows.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Get All Clinic successfully",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
// Xử lí xóa clinic
let handleDeleteClinic = (idInput) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!idInput) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let clinic = await db.Clinics.findOne({ where: { id: idInput } });
        console.log(clinic);
        if (!clinic) {
          resovle({
            errCode: 1,
            errMessage: "Clinics not found",
          });
        }
        if (clinic) {
          await clinic.destroy();
          resovle({
            errCode: 0,
            errMessage: "Delete Clinic Successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Xử lí edit clinic
let handleUpdateClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.address ||
        !data.name ||
        !data.contentHTMLIntro ||
        !data.provinceId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameters",
        });
      }
      let clinic = await db.Clinics.findOne({
        where: { id: data.id },
      });
      if (clinic) {
        clinic.address = data.address;
        clinic.name = data.name;
        clinic.contentHTMLIntro = data.contentHTMLIntro;
        clinic.contentMarkDownIntro = data.contentMarkDownIntro;
        clinic.provinceId = data.provinceId;
        if (data.image) {
          clinic.image = data.image;
        }
        await clinic.save();
        resolve({
          errCode: 0,
          errMessage: "update clinic success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Clinic not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy thông tin trong trang chi tiết chuyên khoa
let getDetailClinicById = (inputId) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!inputId) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataDoctor = [];
        let dataClinic = {};
        dataClinic = await db.Clinics.findOne({
          where: {
            id: inputId,
          },
        });
        if (dataClinic.image) {
          dataClinic.image = new Buffer(dataClinic.image, "base64").toString(
            "binary"
          );
        }
        if (dataClinic) {
          dataDoctor = await db.Doctor_infos.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId"],
          });
        } else {
          dataClinic = {};
          dataDoctor = [];
        }
        resovle({
          errCode: 0,
          errMessage: "Get Clinic successfully",
          data: {
            dataClinic,
            dataDoctor,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// list phòng khám theo tỉnh thành
let getListClinicByProvince = (provinceInput) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!provinceInput) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataClinic = {};
        if (provinceInput === "ALL") {
          dataClinic = await db.Clinics.findAll({
            attributes: {
              exclude: ["contentMarkDownIntro", "createdAt", "updatedAt"],
            },
          });
        } else {
          // tìm vị trí
          dataClinic = await db.Clinics.findAll({
            where: { provinceId: provinceInput },
            attributes: {
              exclude: ["contentMarkDownIntro", "createdAt", "updatedAt"],
            },
          });
        }
        dataClinic.map((item) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }
          return item;
        });
        resovle({
          errCode: 0,
          errMessage: "Get Clinics successfully",
          data: dataClinic,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export default {
  createNewClinic,
  getAllClinic,
  handleDeleteClinic,
  handleUpdateClinic,
  getDetailClinicById,
  getListClinicByProvince,
};
