import Joi from 'joi';

export const CartUpdateValidator = Joi.object({
  productId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')).required(),
  count: Joi.number().required()
});
