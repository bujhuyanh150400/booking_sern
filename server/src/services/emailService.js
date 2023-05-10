require("dotenv").config();
const nodemailer = require("nodemailer");
let sendSimpleEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare by BuiHuyAnh👻"',
    to: data.email,
    subject: subjectEmail(data),
    html: getBodyHTML(data),
  });
};
let sendAttachment = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"BookingCare by BuiHuyAnh👻"',
        to: data.email,
        subject: subjectEmail(data),
        html: getBodyHTMLRemedy(data),
        attachments: [
          {
            // encoded string as an attachment
            filename: "donthuoc.png",
            content: data.image.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
let subjectEmail = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = "Thông tin khám bệnh";
  }
  if (data.language === "en") {
    result = "Information medical appointment";
  }
  return result;
};
let getBodyHTML = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = `
    <i>Đây là 1 sản phẩm test thử bởi Bùi Huy Anh</i>
    <br>
    <h3>Xin chào bệnh nhân: ${data.patientName}</h3>
    <p>Đây là thông tin lịch khám bệnh được cung cấp tại BookingCare phát hành</p>
    <div>
    <h3>Thông tin và thời gian đặt lịch khám bệnh</h3>
    <p><b>Thời gian: </b>${data.time}</p>
    <p><b>Bác sĩ khám: </b>${data.doctorName}</p>
    </div>
      <i>Nếu thông tin trên là đúng, vui lòng click vào đường link dưới để xác nhận và hoàn tất thủ tục dặt lịch khám bệnh</i>
    <div>
    <a href=${data.redirectLink} target="_blank">Nhấn vào đây</a>
    </div>
    <div>
      <i>Xin chân thành cảm ơn</i>
    </div>
`;
  }
  if (data.language === "en") {
    result = `
    <i>This is a test product by Bui Huy Anh</i>
    <br>
    <h3>Hello patient: ${data.patientName}</h3>
    <p>This is the medical appointment information provided by BookingCare</p>
    <div>
    <h3>Information and time to make a medical appointment</h3>
    <p><b>Time: </b>${data.time}</p>
    <p><b>Doctor: </b>${data.doctorName}</p>
    </div>
      <i>If the above information is correct, please click on the link below to confirm and complete the procedure to book an appointment</i>
    <div>
    <a href=${data.redirectLink} target="_blank">Click here</a>
    </div>
    <div>
      <i>Sincerely thank</i>
    </div>
`;
  }
  return result;
};
let getBodyHTMLRemedy = (data) => {
  let result = "";
  if (true) {
    result = `
    <i>Đây là 1 sản phẩm test thử bởi Bùi Huy Anh</i>
    <br>
    <h3>Xin chào bệnh nhân: ${data.fullname}</h3>
    <p>Đây là đơn xác nhận khám xong và đơn thuốc của bác sĩ tới bệnh nhân do BookingCare phát hành</p>
    <div>
    <h3>Bệnh nhân kiểm tra lại thông tin</h3>
    <p><b>Họ và tên: </b>${data.fullname}</p>
    <p><b>Địa chỉ: </b>${data.address}</p>
    </div>
    <div>
    <i>Đây là các ghi chú của bác sĩ và đơn thuốc dành cho bạn</i>
    <p><b>Ghi chú của bác sĩ: </b>${data.note}</p>
    </div>
   
`;
  }
  if (data.language === "en") {
    result = `
      <i>This is a test product by Bui Huy Anh</i>
      <br>
      <h3>Hello patient: ${data.fullname}</h3>
      <p>This is a confirmation of completion of the examination and a doctor's prescription to the patient issued by BookingCare</p>
      <div>
      <h3>Patient rechecks information</h3>
      <p><b>First and last name: </b>${data.fullname}</p>
      <p><b>Address: </b>${data.address}</p>
      </div>
      <div>
      <i>Here are the doctor's notes and prescriptions for you</i>
      <p><b>Doctor's note: </b>${data.note}</p>
      </div>
  
  `;
  }
  return result;
};
export default {
  sendSimpleEmail,
  sendAttachment,
};
