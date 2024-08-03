const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('createRoom', () => {
    console.log('Attempting to create room for socket:', socket.id);
    const roomId = Math.random().toString(36).substring(7);
    rooms.set(roomId, { players: [socket.id], word: '', guessedWord: [] });
    socket.join(roomId);
    console.log('Room created:', roomId);
    socket.emit('roomCreated', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms.has(roomId) && rooms.get(roomId).players.length < 2) {
      rooms.get(roomId).players.push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit('gameReady', rooms.get(roomId).players);
    } else {
      socket.emit('roomError', 'Room not found or full');
    }
  });

  socket.on('setWord', ({ roomId, word }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.word = word.toLowerCase();
      room.guessedWord = Array(word.length).fill('_');
      io.to(roomId).emit('wordSet', room.guessedWord);
    }
  });

  socket.on('makeGuess', ({ roomId, guess }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      const { word, guessedWord } = room;
      let correct = false;

      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guessedWord[i] = guess;
          correct = true;
        }
      }

      io.to(roomId).emit('guessResult', { guessedWord, correct });

      if (guessedWord.join('') === word) {
        io.to(roomId).emit('gameOver', { winner: socket.id, word });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    rooms.forEach((room, roomId) => {
      const index = room.players.indexOf(socket.id);
      if (index !== -1) {
        room.players.splice(index, 1);
        if (room.players.length === 0) {
          rooms.delete(roomId);
        } else {
          io.to(roomId).emit('playerDisconnected');
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});