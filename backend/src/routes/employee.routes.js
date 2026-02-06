const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  deleteEmployee
} = require("../controllers/employee.controller");

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.delete("/:id", deleteEmployee);

module.exports = router;

