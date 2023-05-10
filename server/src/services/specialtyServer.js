import db from "../models";
// Tạo mới chuyên khoa
let createNewSpecialty = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.name ||
        !data.contentHTMLIntro ||
        !data.contentMarkDownIntro
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Specialties.create({
          name: data.name,
          image: data.image,
          contentHTMLIntro: data.contentHTMLIntro,
          contentMarkDownIntro: data.contentMarkDownIntro,
        });
        resovle({
          errCode: 0,
          errMessage: "Create Specialty Successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy All thông tin về chuyên khoa
let getAllSpecialty = () => {
  return new Promise(async (resovle, reject) => {
    try {
      let data = await db.Specialties.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Get All Specialties successfully",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
// xóa specialty
let handleDeleteSpecialty = (idInput) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!idInput) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let specialty = await db.Specialties.findOne({
          where: { id: idInput },
        });
        if (!specialty) {
          resovle({
            errCode: 1,
            errMessage: "Specialty not found",
          });
        }
        if (specialty) {
          await specialty.destroy();
          resovle({
            errCode: 0,
            errMessage: "Delete Specialty Successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Xử lí edit specialty
let handleUpdateSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.contentHTMLIntro ||
        !data.contentMarkDownIntro
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameters",
        });
      }
      let specialty = await db.Specialties.findOne({
        where: { id: data.id },
      });
      if (specialty) {
        specialty.address = data.address;
        specialty.name = data.name;
        specialty.contentHTMLIntro = data.contentHTMLIntro;
        specialty.contentMarkDownIntro = data.contentMarkDownIntro;
        specialty.provinceId = data.provinceId;
        if (data.image) {
          specialty.image = data.image;
        }
        await specialty.save();
        resolve({
          errCode: 0,
          errMessage: "update specialty success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "specialty not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// Lấy thông tin trong trang chi tiết chuyên khoa
let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!inputId || !location) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataDoctor = [];
        let dataSpecialty = {};
        dataSpecialty = await db.Specialties.findOne({
          where: {
            id: inputId,
          },
          attributes: ["contentHTMLIntro", "image"],
        });
        if (dataSpecialty.image) {
          dataSpecialty.image = new Buffer(
            dataSpecialty.image,
            "base64"
          ).toString("binary");
        }
        if (dataSpecialty) {
          if (location === "ALL") {
            dataDoctor = await db.Doctor_infos.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            // tìm vị trí
            dataDoctor = await db.Doctor_infos.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }
        } else {
          dataSpecialty = {};
          dataDoctor = [];
        }
        resovle({
          errCode: 0,
          errMessage: "Get Specialties successfully",
          data: {
            dataSpecialty,
            dataDoctor,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export default {
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  handleDeleteSpecialty,
  handleUpdateSpecialty,
};
