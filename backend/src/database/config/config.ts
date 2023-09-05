import 'dotenv/config'
import { Options } from 'sequelize'

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env

const development: Options = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: 'mysql',
}

export = development
