import { Router } from 'express'
import ProdutController from '../controllers/product.controller'
import updateProductMiddleware from '../middlewares/updateProduct'

const control = new ProdutController()

const productRouter = Router()

productRouter.put('/update', updateProductMiddleware, (req, res, next) =>
  control.update(req, res, next),
)

productRouter.put('/validate', updateProductMiddleware, (req, res, next) =>
  control.validateUpdate(req, res, next),
)

export default productRouter
