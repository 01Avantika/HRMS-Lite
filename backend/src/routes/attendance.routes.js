const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendanceByEmployee,
  getAllAttendance
} = require("../controllers/attendance.controller");

router.post("/", markAttendance);
router.get("/", getAllAttendance);
router.get("/:employeeId", getAttendanceByEmployee);





module.exports = router;

