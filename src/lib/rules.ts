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
  avatar: Joi.string().allow(''),
});

export const createPostSchema = Joi.object()
  .keys({
    message: Joi.string().min(10).max(500).trim().required().messages({
      'string.base': 'Debes ingresar un mensaje válido',
      'string.empty': 'Debes ingresar un mensaje válido',
      'string.min': 'Tu mensaje debe tener al menos 10 caracteres',
      'string.max': 'Tu mensaje debe tener un máximo de 500 caracteres',
      'any.required': 'Debes ingresar un mensaje válido',
    }),
    location: Joi.string().min(4).max(30).trim().required().messages({
      'string.base': 'Debes ingresar una ubicación válida',
      'string.empty': 'Debes ingresar una ubicación válida',
      'string.min': 'La ubicación debe tener al menos 4 caracteres',
      'string.max': 'La ubicación debe tener un máximo de 30 caracteres',
      'any.required': 'Debes ingresar una ubicación válida',
    }),
    image: Joi.string().allow(''),
  })
  .messages({
    'object.unknown': 'Este campo no es válido',
    'string.trim': 'No deben existir espacios en blanco',
  });
