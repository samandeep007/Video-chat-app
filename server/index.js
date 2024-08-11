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
const socketToEmailMapping = new Map();

io.on('connection', socket => {
    
    console.log("Sockets connected")

    socket.on('join-room', ({email, roomId}) => {
        console.log(`User: ${email} joined the room ${roomId}`);
        // Setting the maps
        emailToSocketMapping.set(email, socket.id);
        socketToEmailMapping.set(socket.id, email)
        //Joining the room
        socket.join(roomId);
        socket.emit("joined-room", {roomId})
        socket.broadcast.to(roomId).emit("user-joined", { email })
    })

    socket.on('call-user', ({email, offer}) => {
        const socketId = emailToSocketMapping.get(email);
        const fromEmail = socketToEmailMapping.get(socket.id);
        socket.to(socketId).emit('incomming-call', {from:  fromEmail, offer});
    })
})

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

app.listen(HTTP_PORT, () => {
    console.log("Http server is listening to port:", HTTP_PORT);
})

io.listen(SOCKET_PORT);