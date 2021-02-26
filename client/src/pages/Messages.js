import React from "react";
import { socket, socketContext } from "../utils/socketContext";
import Chat from "./Chat";
import 'react-chat-widget/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Messages() {
    return (
        <socketContext.Provider value={socket}>
            <Chat />
        </socketContext.Provider>
    )
}

export default Messages;