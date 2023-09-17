import { createPool } from "mysql2/promise";
import {db_host, db_user, db_password, db_database, db_port} from './config.js'

export const pool = createPool({
    host:db_host,
    user:db_user,
    password:db_password,
    port:db_port,
    database:db_database
})

