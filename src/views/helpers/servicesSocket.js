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
  const nickname = localStorage.getItem('tokenNickname');

  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname,
  });

  inputMessage.value = '';
  return false;
});

socket.on('welcome', ({ chatMessage, onlineList }) => {
  createMessage(chatMessage);
  socket.emit('newUser', {
    nickname: localStorage.getItem('tokenNickname'),
  });
  newUser(onlineList);
});

socket.on('message', (message) => createMessage(message));
socket.on('newUser', (userList) => {
  newUser(userList);
});