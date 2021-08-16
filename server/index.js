const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require("./userFunc.js");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const router = require("./router.js");

app.use(router);

const server = app.listen(port, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log(`CONNECTION ESTABLISHED AT PORT: ${port}`);
    }
});
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("New user connected!");
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "server",
                msg: `${user.name} left the room!`,
            });
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }
        console.log("Some User Disconnected!");
    });
    socket.on("newUserJoined", ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit("message", {
            user: "server",
            msg: `Welcome ${user.name} to Room: ${user.room}!`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "server",
            msg: `${user.name} has joined the room!`,
        });
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
        });
        callback(null);
    });

    //user sent msg
    socket.on("userMsg", (msg, callback) => {
        const user = getUser(socket.id);
        console.log(`${user.name} sent msg: ${msg}`);
        io.to(user.room).emit("message", { user: user.name, msg: msg });
        callback();
    });
});
