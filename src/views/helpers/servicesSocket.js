const socket = window.io();

// const buttonNickName = document.getElementById('nickname-button');

const newUser = (userList) => {
  const onlineList = document.getElementById('online-list');
  onlineList.innerHTML = '';
  userList.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.innerText = user;
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
    console.log(messageFormat);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('newUser', (userList) => {
  newUser(userList);
});
socket.on('renderMessagesDb', (messagesList) => renderMessages(messagesList));