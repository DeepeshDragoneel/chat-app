import React from 'react';
import "./ChatBar.scss";

const ChatBar = (props) => {
    return (
        <form className="chatMsgForm">
            <input
                className="chatMsgInput"
                type="text"
                value={props.msg}
                placeholder="Enter a Message"
                onChange={(e) => props.setmsg(e.target.value)}
                onKeyPress={(e) =>
                    e.key === "Enter" ? props.sendMsg(e) : null
                }
            ></input>
            <button
                className="sendButton"
                onClick={(e) => {
                    props.sendMsg(e);
                }}
            >
                Send
            </button>
        </form>
    );
}

export default ChatBar;
