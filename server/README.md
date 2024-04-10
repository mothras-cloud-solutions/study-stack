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

POST /api/flashcards/    create a new flashcard expected fields in object in body: term: text, definition: text; confidenceLevel: 0, keywords: text, collection_id: integer   ; note for confidence level the number 0 should always be used for new cards

PUT /api/flashcards/:id    update flashcard with given flashcard id [see post request for format for data to be updated - confidenceLevel may be an integer not equal to 0]
PUT /api/flashcards/:id/confidenceLevel    increase confidence level by 1 for a given flashcard id

PUT /api/flashcards/:id/archived    toggle archived boolean for a given flashcard id
PUT /api/flashcards/:id/starred    toggle starred boolean for a given flashcard id

DELETE /api/flashcards/:id    delete flashcard with given flashcard id


Canvases API:


GET /api/canvases/    get all canvases
GET /api/canvases/:flashcards_id    get a specific canvas for a given flashcard id

POST none: canvas record will automatically be created when Flashcard is created with archived set to false, and canvas_front and canvas_back both set to empty string ''

PUT /api/canvases/:flashcards_id/canvasFront    update canvas_front for given flashcard id by passing {canvas_front: "newCanvasFrontString"}
PUT /api/canvases/:flashcards_id/canvasBack    update canvas_back for given flashcard id by passing {canvas_back: "newCanvasBackString"}
PUT /api/canvases/:flashcards_id/archived    toggle archived property on canvas for given flashcard id (i.e. if previously false set to true, if true set to false)

DELETE /api/canvases/:flashcards_id    delete canvas with given flashcard id


