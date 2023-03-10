const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("./default_process");

const app = express();
//Cors
app.use(cors());
//Base de datos
dbConnection();

app.use(express.json());
//Rutas
//Auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
app.use("/api/company", require("./routes/company"));
app.use("/api/agency", require("./routes/agency"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/equipment", require("./routes/equipment"));
app.use("/api/ticket", require("./routes/ticket"));
app.use("/api/ticketDetails", require("./routes/ticketDetail"));
app.use("/api/template", require("./routes/template"));
app.use("/api/section", require("./routes/section"));
app.use("/api/templateDetail", require("./routes/templateDetail"));

app.listen(4000, () => {
  console.log(`Servidor corriendo en puerto ${4000}`);
});
