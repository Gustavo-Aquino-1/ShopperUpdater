import { NextFunction, Request, Response } from 'express'

const updateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: 'Please, send a json body' })

    if (!req.body.product_code)
      return res
        .status(400)
        .json({ message: 'Please, send the field "product_code"' })

    if (!req.body.new_price)
      return res
        .status(400)
        .json({ message: 'Please, send the field "new_price"' })

    return next()
  } catch (error) {
    return res.status(400).json({
      message:
        'Please, send numbers for fields "product_code", and "new_price"',
    })
  }
}

export default updateProductMiddleware
