const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const r = express.Router();
const Model = require('./model');
const all = require('./all');

const alldata = require('./products.json');
app.use('/api/test', all);

async function main() {
  await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const start = async () => {
  try {
    const d = await Model.deleteMany({});
    // console.log(alldata);
    const p = await Model.create(alldata);
    console.log(p);
  } catch (e) {
    console.log(e);
  }
};
main()
  .then(() => start())
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(process.env.PORT, () => {
  console.log(`server is on http://localhost:${process.env.PORT}`);
});
