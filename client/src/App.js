import "./App.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";

function App() {
    return (
        <Router>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/chat" component={ChatPage}></Route>
        </Router>
    );
}

export default App;
