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
  sessionStorage.setItem('tokenNickname', makeid(16));
};

// const formNickName = document.getElementById('form-nickName');

// const nickNameDisplay = document.createElement('h2');

// const updateNickDB = (oldNick, newNick) => {
//   socket.emit('updateUser', {
//     oldNick,
//     newNick,
//   });
// };

// const setDisplayNick = () => {
//   const nickName = sessionStorage.getItem('tokenNickname');

//   nickNameDisplay.innerText = nickName;
//   const nicknameInput = document.getElementById('nickname-input').value || nickName;

//   sessionStorage.setItem('tokenNickname', nicknameInput);
//   nickNameDisplay.innerText = nicknameInput;
//   formNickName.appendChild(nickNameDisplay);
// };

// formNickName.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const oldNick = sessionStorage.getItem('tokenNickname');
//   setDisplayNick();
//   const newNick = sessionStorage.getItem('tokenNickname');
//   updateNickDB(oldNick, newNick);
// });

setUpUserWebStorage();
// setDisplayNick();

window.onbeforeunload = () => {
  const socket = window.io();
  socket.disconnect();
};
