import { Pool } from 'pg';
import 'dotenv/config';

console.log(process.env.PORT);

const user: string = process.env.DB_USER || 'postgres';
const host: string = process.env.DB_HOST || 'localhost';
const database: string = process.env.DB_DATABASE || 'study_stack';
const password: string = process.env.DB_PASSWORD || 'password';
const port: number = parseInt(process.env.DB_PORT || '5432');

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

type GenericObject = { [key: string]: unknown };

const insertData = async <T extends GenericObject>(data: T[], tableName: string, columns: string[]) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')})`;

        for (const item of data) {
            const values = columns.map(column => item[column]);
            await client.query(insertQuery, values);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(`Error inserting data into ${tableName}:`, err);
    } finally {
        client.release();
    }
};

export { insertData, pool };
