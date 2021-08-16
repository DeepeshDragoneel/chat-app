import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./ChatPage.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatBar from "../ChatBar/ChatBar";
import ChatMsgs from "../ChatMsgs/ChatMsgs";
import { useHistory } from "react-router";
import onlineIcon from "../../assets/onlineIcon.png";

let socket;

const ChatPage = ({ location }) => {
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    const [msgs, setmsgs] = useState([]);
    const [msg, setmsg] = useState("");
    const [users, setusers] = useState([]);
    const WS_END_PNT = `https://simple-chat-app-backend-server.herokuapp.com/`;

    const p = useHistory();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        setname(name);
        setroom(room);
        socket = io(WS_END_PNT);
        socket.emit("newUserJoined", { name, room }, (e) => {
            if (e !== null) {
                alert(e);
                p.push("../");
            }
        });
        return () => {
            socket.emit("disconnet");
            socket.off();
        };
    }, [WS_END_PNT, location.search]);

    useEffect(() => {
        console.log("Setting user msgs!");
        socket.on("message", (msg) => {
            setmsgs((msgs) => [...msgs, msg]);
        });
        socket.on("roomData", ({ users }) => {
            setusers(users);
        });
    }, []);

    const sendMsg = (e) => {
        e.preventDefault();
        if (msg) {
            socket.emit("userMsg", msg, () => {
                setmsg("");
            });
        }
    };

    console.log(msg, msgs);

    return (
        <div>
            <div className="chatPageMainDiv">
                <div className="chatPageInnerDiv">
                    <ChatHeader room={room}></ChatHeader>
                    <ChatMsgs msgs={msgs} name={name}></ChatMsgs>
                    <ChatBar
                        msg={msg}
                        setmsg={setmsg}
                        sendMsg={sendMsg}
                    ></ChatBar>
                    {/* <input
                        type="text"
                        value={msg}
                        onChange={(e) => setmsg(e.target.value)}
                        onKeyPress={(e) => (
                            e.key === 'Enter' ? sendMsg(e) : null
                        )}
                    ></input> */}
                </div>
                <div className="chatPageOnlineUsersDiv">
                    <h1>Simple Chat App 💬</h1>
                    <h2><a href="#">Made BY DEEPESH DRAGONEEL</a></h2>
                    <hr/>
                    <h1>Users Online:</h1>
                    {users.map((user) => (
                        <div className="userOnlineList">
                            <img src={onlineIcon} alt="online icon"></img>
                            <p>{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
