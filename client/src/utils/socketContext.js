import React from "react";
import openSocket from 'socket.io-client';

export const socket= openSocket('http://localhost:8080', {transports: ['websocket']});
export const socketContext= React.createContext();