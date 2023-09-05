import { Router } from 'express'
import ProdutController from '../controllers/product.controller'
import updateProductMiddleware from '../middlewares/updateProduct'

const control = new ProdutController()

const productRouter = Router()

productRouter.put(
  '/update',
  updateProductMiddleware,
  (req, res, next) => control.updateOneProduct(req, res, next),
)

export default productRouter
