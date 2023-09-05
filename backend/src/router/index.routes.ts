import { Router } from 'express'
import productRouter from './product.routes'

const router = Router()
router.use(productRouter)

export default router
