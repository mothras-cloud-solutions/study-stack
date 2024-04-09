import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'study_stack',
    password: 'password',
    port: 5432,
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
