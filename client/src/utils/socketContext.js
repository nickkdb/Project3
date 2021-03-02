import React from "react";
import openSocket from 'socket.io-client';

export const socket= openSocket('https://nerdherd-group5.herokuapp.com/', {transports: ['websocket']});
export const socketContext= React.createContext();