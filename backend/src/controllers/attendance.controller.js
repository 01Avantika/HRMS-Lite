const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { createAttendanceSchema } = require("../validations/attendance.validation");

/**
 * MARK ATTENDANCE
 */
exports.markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    // 1. Find employee
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Create attendance
    const attendance = await Attendance.create({
      employee: employee._id,
      employeeId: employee.employeeId, // ✅ SAVE employeeId
      date: new Date(date),
      status
    });

    res.status(201).json(attendance);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Attendance already marked for this employee on this date"
      });
    }
    next(err);
  }
};


/**
 * GET ATTENDANCE BY EMPLOYEE
 */
exports.getAttendanceByEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = await Attendance.find({
      employee: employee._id
    })
      .populate("employee", "fullName department email")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL ATTENDANCE (FOR TABLE)
 */
exports.getAllAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee", "fullName employeeId")
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (err) {
    next(err);
  }
};
