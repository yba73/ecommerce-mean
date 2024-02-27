const Joi = require("joi");

// Validate data from client to register user info
/*======= ValdiateRegister ========*/
const valdiateSendOrder = (obj) => {
  const schema = Joi.object({
    address: Joi.string().trim().min(3).max(100).required(),

    phone: Joi.number().min(8).max(12).required(),
    livraison: Joi.boolean().required(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateRegister //========*/

module.exports = {
  valdiateSendOrder,
};
