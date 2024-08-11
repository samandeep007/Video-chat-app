import { urlencoded } from 'express';
import express from 'express';
import { Server } from 'socket.io';
import 'dotenv/config'

const app = express();
const io = new Server();

app.use(urlencoded({
    limit: "16kb",
    extended: true
}))

app.use(express.json({
    limit: "16kb",
    extended: true
}))

io.on('connection', socket => {
    
})

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

app.listen(HTTP_PORT, () => {
    console.log("Http server is listening to port:", HTTP_PORT);
})

io.listen(SOCKET_PORT);