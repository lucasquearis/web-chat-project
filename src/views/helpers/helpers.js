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

setUpUserWebStorage();

window.onbeforeunload = () => {
  const socket = window.io();
  socket.disconnect();
};
