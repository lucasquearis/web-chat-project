const socket = window.io();

const newUser = (userList) => {
  const nickNameStorage = sessionStorage.getItem('tokenNickname');
  console.log(nickNameStorage);
  console.log(socket.id);
  const usersWithOutNickNameClient = userList.filter((user) => user.nickname !== nickNameStorage);
  usersWithOutNickNameClient.unshift({ nickname: nickNameStorage, id: socket.id });
  const onlineList = document.getElementById('online-list');
  onlineList.innerHTML = '';
  usersWithOutNickNameClient.forEach(({ nickname }) => {
    const userLi = document.createElement('li');
    userLi.dataset.testid = 'online-user';
    userLi.innerText = nickname;
    onlineList.appendChild(userLi);
  });
};

const createMessage = (chatMessage) => {
  const chatUl = document.getElementById('ul-chat');
  const text = document.createElement('li');
  text.dataset.testid = 'message';
  text.innerText = chatMessage;
  chatUl.appendChild(text);
};

const formChat = document.getElementById('message-form');

formChat.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputMessage = document.getElementById('msg-input');
  const nickname = sessionStorage.getItem('tokenNickname');

  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname,
  });

  inputMessage.value = '';
  return false;
});

socket.on('welcome', ({ onlineList }) => {
  socket.emit('newUser', {
    nickname: sessionStorage.getItem('tokenNickname'),
  });
  newUser(onlineList);
});

const renderMessages = (messagesList) => {
  messagesList.forEach(({ timestamp, nickname, message }) => {
    const messageFormat = `${timestamp} - ${nickname}: ${message}`;
    createMessage(messageFormat);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('newUser', (userList) => {
  newUser(userList);
});
socket.on('renderMessagesDb', (messagesList) => renderMessages(messagesList));

// window.onbeforeunload = () => {
//   socket.disconnect();
// };