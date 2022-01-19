const socket = window.io();

const formChat = document.getElementById('form');
const inputMessage = document.getElementById('msg-input');

formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: 'Teste'
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (chatMessage) => {
  const chatUl = document.getElementById("ul-chat");
  const text = document.createElement("li");
  text.innerText = chatMessage;
  chatUl.appendChild(text);
};

socket.on("welcome", (message) => createMessage(message));
socket.on("message", (message) => createMessage(message));