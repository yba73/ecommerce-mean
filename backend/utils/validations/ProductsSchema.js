const Joi = require("joi");
// Validate data from client to update user info

// Validate data from client to create new product
/*======= ValdiateCreateProduct ========*/
const ValdiateCreateUdateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(4).max(100).required(),
    price: Joi.number().required(),
    description: Joi.string().trim().min(4).trim().required(),
    count: Joi.number().required(),
    genre: Joi.string().required(),
    count: Joi.number().required(),
  });
  return schema.validate(obj);
};
/*=======// ValdiateCreateUdateProduct //========*/

module.exports = {
  ValdiateCreateUdateProduct,
};
