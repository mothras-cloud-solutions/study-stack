** generateXXX.js files are for read-only. DO NOT generate new JSON files unless directed to do so. **
** Use db.ts and importData.ts to load into database tables **

Adjust any paths in db.ts and importData.ts


Log into postgreSQL:

```sql
-- -- Create the study_stack database
CREATE DATABASE IF NOT EXISTS study_stack;

\c study_stack;
```

Run schema.sql file to create tables:

**_adjust file path as needed_**

`sudo -u postgres psql -d study_stack -a -f server/database/schema.sql`

Run importData.ts:

`npx ts-node server/database/importData.ts`

Check table load with query from study_stack database:

Example:
`SELECT * FROM users limit 10;`

Verify connection to server from database:
Use Postman and test a get request to “localhost:3000/api/users”

List of APIs:


Collections API:

GET /api/collections/    get all collections (decks)
GET /api/collections/:id    get a specific collection by it's collection id
GET /api/collections/user/:user_id    get all collections for a specific user by the user id
GET /api/collections/user/:user_id/:id    get a specific collection for a given user_id and collection id

POST /api/collections/    create a new collection; expected fields in body: title: text, description: text; subjects: text, user_id: text

PUT /api/collections/:id    update collection with given collection id; expected fields to be updated in body: title: text, description: text; subjects: text

DELETE /api/collections/:id    delete collection with given collection id


Flashcards API:

GET /api/flashcards/    get all flashcards (decks)
GET /api/flashcards/collection_id/:collection_id    get all flashcards for a given collection id
GET /api/flashcards/:id    get a specific flashcard for a given flashcard id

POST /api/flashcards/    create a new flashcard [need data format]

PUT /api/flashcards/:id    update flashcard with given flashcard id [need data format]
PUT /api/flashcards/:id/confidenceLevel    increase confidence level by 1 for a given flashcard id
PUT /api/flashcards/:id/archived    toggle archived boolean for a given flashcard id
PUT /api/flashcards/:id/starred    toggle starred boolean for a given flashcard id

DELETE /api/flashcards/:id    delete flashcard with given flashcard id


Canvases API:


GET /api/canvases/    get all canvases
GET /api/canvases/:flashcards_id    get a specific canvas for a given flashcard id

POST /api/canvases/    create a new canvas

PUT /api/canvases/:flashcards_id    update canvas with given flashcard id

DELETE /api/canvases/:flashcards_id    delete canvas with given flashcard id




router.get('/', getAllCanvases);
router.get('/flashcards_id', getCanvasById);

router.post('/', createCanvas);

router.put('/flashcards_id', updateCanvas);
router.put('/:flashcards_id/canvasFront', updateCanvasFront);
router.put('/:flashcards_id/canvasBack', updateCanvasBack);

router.delete('/flashcards_id', deleteCanvas);


