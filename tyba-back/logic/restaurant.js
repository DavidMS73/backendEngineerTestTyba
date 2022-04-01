const Joi = require("joi");

const validateGetRestaurant = (user) => {
  const schema = Joi.object({
    latitude: Joi.required(),
    longitude: Joi.required(),
    pagetoken: Joi.optional(),
  });

  return schema.validate(user);
};

exports.validateGetRestaurant = validateGetRestaurant;
