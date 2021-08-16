import React from "react";
import "./ChatMsgView.scss";
import { useState } from "react";

const ChatMsgView = ({ msg: {user, msg}, name }) => {
    let sentByTheUser = false;
    const username = name.trim();
    if (username === user) {
        sentByTheUser = true;
    }
    return sentByTheUser ? (
        <div className="sentByUserMsgDiv">
            <p className="sentBy">{username}</p>
            <p className="msgText">{msg}</p>
        </div>
    ) : (
        <div className="notsentByUserMsgDiv">
            <p className="sentBy">{user}</p>
            <p className="msgText">{msg}</p>
        </div>
    );
};

export default ChatMsgView;
