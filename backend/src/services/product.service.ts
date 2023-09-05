import { ModelStatic } from 'sequelize'
import Product from '../database/models/Product'
import Pack from '../database/models/Pack'
import IUpdateOneProduct from '../interfaces/IUpdateoneProduct'
import schema from './validations/schema'
import { response, responseWithMessage } from '../utils/genericResponse'

export default class ProductService {
  private modelProduct: ModelStatic<Product> = Product
  private modelPack: ModelStatic<Pack> = Pack

  async updateOneProduct(body: IUpdateOneProduct) {
    const { error } = schema.productSchema.validate(body)
    if(error) return responseWithMessage(400, error.message)
    return response(200, {})
  }
}
