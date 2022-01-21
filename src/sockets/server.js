const { listMessages, saveMessage } = require('../models/messages.js');
const { formatAMPM } = require('./helpers.js');

let userList = [];

const updateUserList = (oldNick, newNick) => {
  const newUserList = userList.map((user) => {
    if (user.nickname === oldNick) {
      return { nickname: newNick, id: user.id };
    }
    return { nickname: user.nickname, id: user.id };
  });
  userList = newUserList;
};

const emitWelcome = (socket) => {
  socket.emit('welcome', {
    onlineList: userList,
  });
};

const onMessage = (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await saveMessage(chatMessage, nickname);
    io.emit('message', `${formatAMPM(new Date())} - ${nickname}: ${chatMessage}`);
  });
};

const onNewUser = (socket, io) => {
  socket.on('newUser', ({ nickname }) => {
    const alreadyExistUser = userList.find((user) => user.nickname === nickname);
    if (alreadyExistUser) {
      return io.emit('newUser', userList);
    } 
    return userList.push({ nickname, id: socket.id }) && io.emit('newUser', userList);
  });
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

const onRemoveUser = (socket, io) => {
  socket.on('disconnect', () => {
    const indexOfUser = userList.findIndex((user) => user.id === socket.id);
    userList.splice(indexOfUser, 1);
    io.emit('newUser', userList);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    emitWelcome(socket);
    onMessage(socket, io);
    onNewUser(socket, io);
    onUpdateUser(socket, io);
    emitRenderMessagesDb(socket);
    onRemoveUser(socket, io);
  });
};
