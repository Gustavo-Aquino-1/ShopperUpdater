import { NextFunction, Request, Response } from 'express'
import ProductService from '../services/product.service'

export default class ProdutController {
  private service = new ProductService()

  async validateUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.validateUpdate(req.body)
      res.status(status).json(message)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.updateProduct(req.body)
      res.status(status).json(message)
    } catch (error) {
      next(error)
    }
  }
}
