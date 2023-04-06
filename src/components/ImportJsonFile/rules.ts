import Joi from 'joi';

const fullUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  avatar: Joi.string().allow(''),
});

const fullPostSchema = Joi.object().keys({
  id: Joi.string(),
  image: Joi.string().allow(''),
  message: Joi.string().min(10).max(500).trim().required(),
  likes: Joi.array().items(fullUserSchema),
  author: Joi.object()
    .keys({
      username: Joi.string().required(),
      name: Joi.string().required(),
      surname: Joi.string().required(),
      avatar: Joi.string().allow(''),
    })
    .required(),
  location: Joi.string().min(4).max(30).trim().required(),
  status: Joi.string().valid('published', 'drafted', 'deleted').required(),
  create_at: Joi.custom((value: string, helper) => {
    if (Number.isNaN(Date.parse(value))) {
      return helper.error('date.invalid');
    }

    return value;
  }).required(),
});

export const importPostsSchema = Joi.array().items(fullPostSchema);
