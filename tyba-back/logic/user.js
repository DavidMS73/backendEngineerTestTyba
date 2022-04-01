const Joi = require("joi");
const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

const validateUserLogin = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required().messages({
      "string.min": "Incorrect username. Nombre de usuario incorrecto.",
      "string.max": "Incorrect username. Nombre de usuario incorrecto.",
    }),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

const validateUserCreate = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required().messages({
      "string.min":
        "You must use a minimum of 5 characters in the username. Debe usar  mínimo 3 caracteres en el nombre de usuario.",
      "string.max":
        "You must use a maximum of 30 characters in the username. Debe usar  máximo 30 caracteres en el nombre de usuario.",
    }),
    password: Joi.string().regex(regexPassword).required().messages({
      "string.pattern.base":
        "Incorrect password pattern. The password must be between 8 and 16 characters long, have at least one digit, at least one lowercase and at least one uppercase, and can contain other symbols. Patrón de contraseña incorrecto. La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula, y puede tener otros símbolos.",
    }),
    repeat_password: Joi.ref("password"),
    name: Joi.string().optional(),
  })
    .with("password", "repeat_password")
    .messages({
      "any.only": "Passwords must match. Las contraseñas deben coincidir.",
    });

  return schema.validate(user);
};

const validateUserLogoutOrRefresh = (user) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return schema.validate(user);
};

exports.validateUserLogin = validateUserLogin;
exports.validateUserCreate = validateUserCreate;
exports.validateUserLogoutOrRefresh = validateUserLogoutOrRefresh;
