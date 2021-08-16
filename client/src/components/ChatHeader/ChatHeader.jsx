import React from 'react';
import "./ChatHeader.scss";
import closeIcon from "../../assets/closeIcon.png";
import onlineIcon from "../../assets/onlineIcon.png";

const ChatHeader = ({room}) => {
    return (
        <div className="ChatHeaderMainDiv">
            <div className="ChatHeaderLeft">
                <img className="onlineIcon" src={onlineIcon} alt="onlineIcon"></img>
                <h1>{room}</h1>
            </div>
            <div className="ChatHeaderRight">
                <a href="/"><img src={closeIcon} alt="closeIcon"></img></a>
            </div>
        </div>
    )
}

export default ChatHeader;
