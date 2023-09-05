import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";


export default class ProdutController {
  private service = new ProductService()

  async updateOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.updateOneProduct(req.body)
      res.status(status).json(message)
    } catch (error) {
      next(error)
    }
  }
}