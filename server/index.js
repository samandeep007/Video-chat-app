import { urlencoded } from 'express';
import express from 'express';
import { Server } from 'socket.io';
import 'dotenv/config'
import cors from 'cors';

const app = express();
const io = new Server({
    cors: true
});

app.use(urlencoded({
    limit: "16kb",
    extended: true
}))

app.use(express.json({
    limit: "16kb",
    extended: true
}))

app.use(cors({
    origin: "*",
    credentials: true
}))

const emailToSocketMapping = new Map();

io.on('connection', socket => {
    console.log("Sockets connected")
    socket.on('join-room', (data) => {
        const { email, roomId } = data;
        console.log(`User: ${email} joined the room ${roomId}`);
        emailToSocketMapping.set(email, socket.id);
        socket.join(roomId);
        socket.emit("joined-room", {roomId})
        socket.broadcast.to(roomId).emit("user-joined", { email })
    })
})

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

app.listen(HTTP_PORT, () => {
    console.log("Http server is listening to port:", HTTP_PORT);
})

io.listen(SOCKET_PORT);