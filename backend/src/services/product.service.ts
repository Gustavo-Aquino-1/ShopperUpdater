import { ModelStatic } from 'sequelize'
import Product from '../database/models/Product'
import Pack from '../database/models/Pack'
import IUpdateOneProduct from '../interfaces/IUpdateoneProduct'
import schema from './validations/schema'
import { response, responseWithMessage } from '../utils/genericResponse'

export default class ProductService {
  private modelProduct: ModelStatic<Product> = Product
  private modelPack: ModelStatic<Pack> = Pack

  async updateOneProduct(body: IUpdateOneProduct[]) {
    const { error } = schema.productsSchema.validate(body)
    if (error) return responseWithMessage(400, error.message)
    return response(200, {})

    // validar se é um pacote, se for devem ser alterados no mesmo arquivo o preço dos componentes,
    // se for um produto e ele estiver em um ou mais pacotes, esses pacotes devem ter seus valores
    // reajustados de acordo com o novo preço do produto, caso nao venha o novo preço dos pacotes no
    // mesmo arquivo, a atualização será bloqueada
    // se for um produto e tentar ser atualizado para menos que seu preço de custo, resultará em
    // ação bloqueada
    // o preço de custo de um produto não pode ser alterado
    // o preço de custo de um pacote pode ser alterado (e deve ser alterado quando um de seus componentes mudar de valor, lembrando o preço de qualquer produto (incluindo um pacote - que é um produto), nao pode custar menos eu seu custo de fabricação)
  }
}
