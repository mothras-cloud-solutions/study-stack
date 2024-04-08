/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static('client/dist'));



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});