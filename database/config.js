const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017/tecnogenia");
    console.log("DB en linea");
  } catch (error) {
    console.log(error);
    throw new Error("error a la hora de iniciar la BD");
  }
};
module.exports = { dbConnection };
