import Joi from 'joi';

export const loginSchema = Joi.object()
  .keys({
    username: Joi.string()
      .min(3)
      .max(20)
      .trim()
      .pattern(/^[a-zA-Z0-9._-]+$/)
      .required()
      .messages({
        'string.base': 'Debes ingresar un nombre de usuario válido',
        'string.empty': 'Debes ingresar un nombre de usuario válido',
        'string.min': 'Debes ingresar un usuario de mínimo 3 caracteres',
        'string.max': 'Debes ingresar un usuario de máximo 20 caracteres',
        'string.trim': 'No deben existir espacios en blanco',
        'string.pattern.base': 'Debes ingresar un nombre de usuario válido',
        'any.required': 'Debes ingresar un nombre de usuario válido',
      }),
  })
  .messages({
    'object.unknown': 'Este campo no es válido',
  });

export const registerSchema = loginSchema.keys({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Debes ingresar un nombre válido',
    'string.empty': 'Debes ingresar un nombre válido',
    'string.min': 'Debes ingresar un nombre de mínimo 3 caracteres',
    'string.max': 'Debes ingresar un nombre de máximo 20 caracteres',
    'any.required': 'Debes ingresar un nombre válido',
  }),
  surname: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Debes ingresar un apellido  válido',
    'string.empty': 'Debes ingresar un apellido  válido',
    'string.min': 'Debes ingresar un apellido de mínimo 3 caracteres',
    'string.max': 'Debes ingresar un apellido de máximo 20 caracteres',
    'any.required': 'Debes ingresar un apellido  válido',
  }),
});
