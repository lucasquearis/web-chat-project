const socket = window.io();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() 
* charactersLength));
 }
 return result;
}

localStorage.setItem('tokenNickname', makeid(16));

const nickName = localStorage.getItem('tokenNickname');

const formChat = document.getElementById('message-form');
const inputMessage = document.getElementById('msg-input');
// const buttonNickName = document.getElementById('nickname-button');
const formNickName = document.getElementById('form-nickName');
const nickNameDisplay = document.createElement('h2');
nickNameDisplay.dataset.testid = 'online-user';
nickNameDisplay.innerText = nickName;
formNickName.appendChild(nickNameDisplay);

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameInput = document.getElementById('nickname-input').value;
  localStorage.setItem('tokenNickname', nicknameInput);
  nickNameDisplay.innerText = nicknameInput;
});

const newUser = (userList) => {
  const onlineList = document.getElementById('online-list');
  onlineList.innerHTML = '';
  userList.forEach((user) => {
    const userLi = document.createElement('li');
    console.log(user);
    userLi.innerText = user;
    onlineList.appendChild(userLi);
  });
};

formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: localStorage.getItem('tokenNickname'),
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (chatMessage) => {
  const chatUl = document.getElementById('ul-chat');
  const text = document.createElement('li');
  text.dataset.testid = 'message';
  text.innerText = chatMessage;
  chatUl.appendChild(text);
};

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