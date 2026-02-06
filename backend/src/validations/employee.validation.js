const Joi = require("joi");

const createEmployeeSchema = Joi.object({
  employeeId: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required()
});

module.exports = {
  createEmployeeSchema
};
