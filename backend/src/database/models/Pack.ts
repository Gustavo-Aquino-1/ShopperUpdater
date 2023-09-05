import { Model } from 'sequelize'
import db from '.'
import sequelize from 'sequelize'
import Product from './Product'

class Pack extends Model {
  declare id: bigint
  declare packId: bigint
  declare productId: bigint
  declare qty: bigint
}

Pack.init(
  {
    id: {
      type: sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    packId: {
      type: sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'code',
      },
    },
    productId: {
      type: sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'code',
      },
    },
    qty: {
      type: sequelize.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    tableName: 'packs',
    timestamps: false,
  },
)

Pack.belongsTo(Product, {
  foreignKey: 'packId',
  as: 'pack'
})

Pack.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

export default Pack;