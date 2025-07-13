const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const reservationsRoutes = require('./routes/reservations.routes');
const commentsRoutes = require('./routes/comments.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const messagesRoutes = require('./routes/messages.routes');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    credentials: true
  }
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/comments', commentsRoutes);
app.use('/messages', messagesRoutes);

app.set('io', io);
io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
  });
});

// // הגשת קבצים סטטיים של ה-client
// app.use(express.static(path.join(__dirname, '../client/dist')));

// // טיפול ב-404 לכל נתיבי ה-API
// app.use(['/auth', '/users', '/reservations', '/comments', '/messages'], (req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// // SPA fallback - רק לנתיבים שאינם מתחילים בנתיבי השרת
// app.get(/^\/(?!auth|users|reservations|comments|messages).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
