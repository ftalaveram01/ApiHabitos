import mysql from 'mysql2/promise';

export class ConnectionDB {
    async connect() {
        const dbConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        };
        
        const connectionString = dbConfig

        return await mysql.createConnection(connectionString);
    }
}