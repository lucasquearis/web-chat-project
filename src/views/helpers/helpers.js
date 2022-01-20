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

const setUpUserWebStorage = () => {
  localStorage.setItem('tokenNickname', makeid(16));
};

const formNickName = document.getElementById('form-nickName');

const nickNameDisplay = document.createElement('h2');

const updateNickDB = (oldNick, newNick) => {
  const socket = window.io();
  console.log('esse é o velho', oldNick);
  console.log('esse é o novo', newNick);
  socket.emit('updateUser', {
    oldNick,
    newNick,
  });
};

const setDisplayNick = () => {
  const nickName = localStorage.getItem('tokenNickname');

  nickNameDisplay.dataset.testid = 'online-user';
  nickNameDisplay.innerText = nickName;
  const nicknameInput = document.getElementById('nickname-input').value || nickName;

  localStorage.setItem('tokenNickname', nicknameInput);
  nickNameDisplay.innerText = nicknameInput;
  formNickName.appendChild(nickNameDisplay);
};

formNickName.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNick = localStorage.getItem('tokenNickname');
  setDisplayNick();
  const newNick = localStorage.getItem('tokenNickname');
  updateNickDB(oldNick, newNick);
});

setUpUserWebStorage();
setDisplayNick();
