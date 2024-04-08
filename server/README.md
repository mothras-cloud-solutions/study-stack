** generateXXX.js files are for read-only. DO NOT generate new JSON files unless directed to do so. **
** Use db.ts and importData.ts to load into database tables **

Adjust any paths in db.ts and importData.ts

Change module and target inside tsconfig.json:

```json changes
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "es2020"
  }
}
```

Log into postgreSQL:

```sql
-- -- Create the study_stack database
CREATE DATABASE IF NOT EXISTS study_stack;

\c study_stack;
```

Run schema.sql file to create tables:

**_adjust file path as needed_**

`sudo -u postgres psql -d study_stack -a -f /home/andrewpark0408/StudyStack/study-stack/src/server/database/schema.sql`

Run importData.ts:

`npx ts-node src/server/database/importData.ts`

Check table load with query from study_stack database:

Example:
`SELECT * FROM users limit 10;`

Verify connection to server from database:
Use Postman and test a get request to “localhost:3000/api/users”
