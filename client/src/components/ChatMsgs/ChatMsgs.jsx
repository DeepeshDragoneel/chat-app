import React from 'react';
import ChatMsgView from '../ChatMsgView/ChatMsgView';
import "./ChatMsgs.scss";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatMsgs = ({msgs, name}) => {
    return (
        <ScrollToBottom className="messages">
            {msgs.map((msg, key) => (
                <div key={key}><ChatMsgView msg={msg} name={name}></ChatMsgView></div>
            ))}
        </ScrollToBottom>
    )
}

export default ChatMsgs;
