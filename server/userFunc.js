const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim();
    room = room.trim().toLowerCase();

    const userExists = users.findIndex(user => user.room === room && user.name === name);

    if (userExists !== -1) {
        return {error: "Username already taken!"}
    }
    const user = { id, name, room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const idx = users.findIndex(user => user.id === id);
    if (idx !== -1) {
        return users.splice(idx, 1)[0];
    }
}

const getUser = (id) => {
    return users.find(user => user.id===id);
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room===room);
}

module.exports = {
    addUser, removeUser, getUser, getUsersInRoom,
}