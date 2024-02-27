const Joi = require("joi");

// Validate data from client to register user info
/*======= ValdiateRegister ========*/
const ValdiateRegister = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).trim().required(),
    role: Joi.string(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateRegister //========*/

/*======= ValdiateRegister ========*/
const ValdiateLogin = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).trim().email().required(),
    password: Joi.string().trim().min(6).trim().required(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateRegister //========*/

/*======= ValdiateUdatedUser ========*/
const ValdiateUdatedUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    age: Joi.number().integer().required(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateUdatedUser //========*/

module.exports = {
  ValdiateRegister,
  ValdiateUdatedUser,
  ValdiateLogin,
};
