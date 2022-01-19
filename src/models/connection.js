const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    });
}

module.exports = connection;
