const joi = require("joi");
const AuthPatientSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  age: joi.number().integer().required(),
  gender: joi.string().valid("Male", "Female").required(),
  CNIC: joi.number().integer().required(),
  emailAddress: joi.string().email().required(),
  shopName: joi.string().required(),
  shopLogo: joi.string(),
  password: joi.string().required(),
});
module.exports = { AuthPatientSchema };
