const Joi = require("joi");

exports.createAttendanceSchema = Joi.object({
  employeeId: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid("Present", "Absent").required()
});
