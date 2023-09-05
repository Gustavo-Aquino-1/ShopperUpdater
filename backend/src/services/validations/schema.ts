import joi from 'joi'

const productSchema = joi.object({
  product_code: joi.number().positive().required(),
  new_price: joi.number().positive().required(),
})

export = { productSchema }
