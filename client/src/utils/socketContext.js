import React from "react";
import openSocket from 'socket.io-client';

export const socket= openSocket('http://localhost:3001', {transports: ['websocket']});
export const socketContext= React.createContext();