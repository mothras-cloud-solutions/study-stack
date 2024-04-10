/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static('client/dist'));

console.log("inside server", process.env.PORT)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});