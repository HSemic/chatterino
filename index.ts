// Imports
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';

// Express app setup
const app = express();
const server = require('http').createServer(app);

// Adding CORS
app.use(cors());

// Specifying PORT to environment variable value or 5000
const PORT = process.env.PORT || 5000;

// Main route
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running...');
});

// IO setup
const io = new Server(server, {
  cors: {
    origin: 'https://chattterino.netlify.app',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('calluser', { signal: signalData, from, name });
  });

  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', {
      signal: data.signal,
      from: data.from
    });
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
