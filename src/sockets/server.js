const { listMessages, saveMessage } = require('../models/messages.js');
const { formatAMPM } = require('./helpers.js');

let userList = [];

const updateUserList = (oldNick, newNick) => {
  const newUserList = userList.map((user) => {
    if (user === oldNick) {
      return newNick;
    }
    return user;
  });
  userList = newUserList;
};

const emitWelcome = (socket) => {
  socket.emit('welcome', {
    chatMessage: 'Seja bem vindo ao chat!',
    onlineList: userList,
  });
};

const onMessage = (socket, io) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${formatAMPM(new Date())} - ${nickname}: ${chatMessage}`);
  });
};

const onNewUser = (socket, io) => {
  socket.on('newUser', ({ nickname }) => (userList.includes(nickname) ? io
  .emit('newUser', userList) : userList.push(nickname) && io.emit('newUser', userList)));
};

const onUpdateUser = (socket, io) => {
  socket.on('updateUser', ({ oldNick, newNick }) => {
    updateUserList(oldNick, newNick);
    io.emit('newUser', userList);
  });
};

const emitRenderMessagesDb = async (socket) => {
  socket.emit('renderMessagesDb', await listMessages());
};

const onSaveMessage = (socket) => {
  socket.on('saveMessage', async (message) => {
    await saveMessage(message);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    emitWelcome(socket);
    onMessage(socket, io);
    onNewUser(socket, io);
    onUpdateUser(socket, io);
    emitRenderMessagesDb(socket);
    onSaveMessage(socket);
  });
};
