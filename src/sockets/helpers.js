const formatAMPM = (date) => {
  // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
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

module.exports = { formatAMPM };