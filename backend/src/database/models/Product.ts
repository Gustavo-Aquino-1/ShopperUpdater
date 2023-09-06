import { Model } from 'sequelize'
import db from '.'
import sequelize from 'sequelize'

class Product extends Model {
  declare code: bigint
  declare name: string
  declare costPrice: number
  declare salesPrice: number
}

Product.init(
  {
    code: {
      type: sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING(100),
      allowNull: false,
    },
    costPrice: {
      type: sequelize.DECIMAL(9, 2),
      allowNull: false,
    },
    salesPrice: {
      type: sequelize.DECIMAL(9, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    tableName: 'products',
    timestamps: false,
  },
)

export default Product
