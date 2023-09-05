import { Router } from 'express'
import ProdutController from '../controllers/product.controller'

const control = new ProdutController()

const productRouter = Router()

productRouter.put('/update', control.updateOneProduct.bind(control))

export default productRouter
