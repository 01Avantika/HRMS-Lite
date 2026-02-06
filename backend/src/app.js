const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const employeeRoutes = require("./routes/employee.routes");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "HRMS API running" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", require("./routes/attendance.routes"));

app.use(errorHandler);

module.exports = app;
