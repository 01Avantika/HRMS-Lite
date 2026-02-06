const Employee = require("../models/Employee");
const { createEmployeeSchema } = require("../validations/employee.validation");

exports.createEmployee = async (req, res, next) => {
  try {
    const { error } = createEmployeeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingEmployee = await Employee.findOne({
      employeeId: req.body.employeeId
    });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee with this Employee ID already exists"
      });
    }

    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
