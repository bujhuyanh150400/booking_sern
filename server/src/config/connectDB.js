import { Sequelize } from "sequelize";

// Tạo biến kết nối tới database
const sequelize = new Sequelize("booking_sern", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging:false
});


// Connect tới database
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default connectDB;