const connection = require('./connection');
const { formatAMPM } = require('../sockets/helpers');

const saveMessage = (message, nickname) => connection()
    .then((db) => db.collection('messages').insertOne({
      message,
      nickname,
      timestamp: formatAMPM(new Date()),
    }));

const listMessages = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

module.exports = { saveMessage, listMessages };