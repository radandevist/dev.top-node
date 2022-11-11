import { User } from './user.entity'
import { DataSource } from "typeorm"

const { 
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  NODE_ENV,
} = process.env;

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User],
    synchronize: NODE_ENV !== "production",
})

export function initializeDataSource() {
  dataSource.initialize();
}
