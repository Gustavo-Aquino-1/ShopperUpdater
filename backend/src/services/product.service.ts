import { ModelStatic } from 'sequelize'
import Product from '../database/models/Product'
import Pack from '../database/models/Pack'
import schema from './validations/schema'
import { response, responseWithMessage } from '../utils/genericResponse'
import IUpdateProduct from '../interfaces/IUpdateProduct'
import IProduct from '../interfaces/IProduct'

export default class ProductService {
  private modelProduct: ModelStatic<Product> = Product
  private modelPack: ModelStatic<Pack> = Pack

  private validateFields(body: IUpdateProduct[]) {
    const { error } = schema.productsSchema.validate(body)
    if (error) return error.message
  }

  private async findByPk(pk: bigint, errors: any) {
    const product = await this.modelProduct.findByPk(pk)
    if (!product) {
      errors[String(pk)].push('Produto inexistente')
      return null
    }
    return product
  }

  private isLessThanCostPrice(
    newPrice: number,
    costPrice: number,
    errors: any,
    code: bigint,
  ) {
    if (newPrice < costPrice) {
      errors[String(code)].push(
        'Produto não pode ter um preço menor que seu preço de custo',
      )
    }
  }

  private isInTheTenPorcentRange(
    newPrice: number,
    salesPrice: number,
    errors: any,
    code: bigint,
  ) {
    const tenPorcent = salesPrice * 0.1
    let readjustment = +Number(newPrice - salesPrice).toFixed(2)
    if (readjustment < 0) readjustment = -readjustment
    if (readjustment > tenPorcent) {
      errors[String(code)].push(
        'Produto não pode ter um novo preço com reajuste maior do que 10% do preço atual',
      )
    }
  }

  async validatePack(
    packs: Pack[],
    body: IUpdateProduct[],
    errors: any,
    code: bigint,
    product: IProduct,
    newPrice: number,
  ) {
    const packProductsCodes = packs.map((e) => Number(e.productId))
    const components = body.filter((e) =>
      packProductsCodes.includes(Number(e.product_code)),
    )
    if (!components.length) {
      errors[String(code)].push(
        `Não é permitido a atualização do preço do pacote, 
        sem a atualização de pelo menos um de seus componentes`,
      )
      return
    }
    let priceUpdated = product.salesPrice
    for (let i = 0; i < components.length; i++) {
      const packC = packs.find(
        (e) => Number(e.productId) === Number(components[i].product_code),
      )
      if (!packC) continue
      
      const findProduct = await this.modelProduct.findByPk(
        components[i].product_code,
      )
      priceUpdated -= findProduct!.salesPrice * Number(packC!.qty)
      priceUpdated += components[i].new_price * Number(packC!.qty)
    }
    priceUpdated = +priceUpdated.toFixed(2)
    if (priceUpdated != newPrice) {
      errors[String(code)].push('Novo preço do pacote é inconsistente')
    }
  }

  async validateProduct(code: bigint, body: IUpdateProduct[], errors: any) {
    const superPacks = await this.modelPack.findAll({
      where: { productId: code },
    })
    if (!superPacks.length) return
    for (let i = 0; i < superPacks.length; i++) {
      const packId = superPacks[i].packId
      const packUpdating = body.find(
        (e) => Number(e.product_code) === Number(packId),
      )
      if (!packUpdating) {
        errors[String(code)].push(
          `Quando um produto é atualizado, todos os pacotes em que ele
          é um componente devem ser atualizados - falta atualizar o pacote - ${packId}`,
        )
      }
    }
  }

  async validateUpdate(body: IUpdateProduct[]) {
    const error = this.validateFields(body)
    if (error) return responseWithMessage(400, error)
    const errors: any = {}
    const allProducts = []
    for (let i = 0; i < body.length; i++) {
      const code = body[i].product_code
      const newPrice = +body[i].new_price

      errors[String(code)] = []

      const product = await this.findByPk(code, errors)
      if (!product) continue
      allProducts.push(product)

      this.isLessThanCostPrice(newPrice, product.costPrice, errors, code)
      this.isInTheTenPorcentRange(newPrice, product.salesPrice, errors, code)

      const packs = await this.modelPack.findAll({ where: { packId: code } })
      if (packs.length) {
        await this.validatePack(packs, body, errors, code, product, newPrice)
      } else {
        await this.validateProduct(code, body, errors)
      }

      if (!errors[String(code)].length) delete errors[String(code)]
    }

    if (Object.keys(errors).length) return response(400, [errors, allProducts])
    return response(200, [null, allProducts])
  }

  async updateProduct(body: IUpdateProduct[]) {
    const { status, message } = await this.validateUpdate(body)
    if (status != 200) return response(status, message)

    for (let i = 0; i < body.length; i++) {
      await this.modelProduct.update(
        { salesPrice: body[i].new_price },
        {
          where: { code: body[i].product_code },
        },
      )
    }

    return response(204, null)
  }
}
