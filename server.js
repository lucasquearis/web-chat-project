const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./src/sockets/server')(io);

app.use(express.static(path.join(__dirname, 'src', 'views')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/views/index.html`);
});

http.listen(PORT, () => console.log(`Online na porta ${PORT}`));