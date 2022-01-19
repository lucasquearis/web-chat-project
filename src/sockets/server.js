// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

const formatAMPM = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const formatedHour = `${hours}:${minutes}:${seconds} ${ampm}`;
  return `${day}-${month}-${year} ${formatedHour}`;
};

const userList = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID ${socket.id}`);
    socket.emit('welcome', {
      chatMessage: 'Seja bem vindo ao chat!',
      onlineList: userList,
    });
    socket.on('message', ({ chatMessage, nickname }) => {
      console.log(`${nickname} enviou uma mensagem ${chatMessage}`);
      io.emit('message', `${formatAMPM(new Date())} - ${nickname}: ${chatMessage}`);
    });
    socket.on('newUser', ({ nickname }) => {
      console.log(userList);
      return userList.includes(nickname) ? io
        .emit('newUser', userList) : userList.push(nickname) && io.emit('newUser', userList);
    });
  });
};
