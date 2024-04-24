import Joi from 'joi';

export const CartUpdateValidator = Joi.object({
  productId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
  count: Joi.number().required()
});
