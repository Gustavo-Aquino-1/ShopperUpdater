import { NextFunction, Request, Response } from 'express'

const updateProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body)
    return res.status(400).json({ message: 'Please, send a json body' })

  return next()
}

export default updateProductMiddleware
