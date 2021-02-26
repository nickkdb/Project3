import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Row, Col } from "react-bootstrap";
import { addResponseMessage, addUserMessage, Widget, dropMessages } from 'react-chat-widget';
import Thread from '../components/thread';
import { socketContext } from '../utils/socketContext';
import UserContext from "../utils/UserContext";
import Banner from "../components/Banner";
import "../styles/style.css";


function Chat() {

    const socket = useContext(socketContext);

    const user = useContext(UserContext).displayName;
    const [threads, setThreads] = useState(null);
    const [otherUser, setOtherUser] = useState();
    const [subtitle, setSubtitle] = useState();
    const [room, setRoom] = useState(null);
    const [resData, setResData] = useState();

    let results;

    useEffect(() => {
        socket.on("message", data => {
            if (data.sender === otherUser) {
                let text = data.text;
                addResponseMessage(text);
            }
        })

        return function cleanup() { socket.off("message") }
    })

    useEffect(() => {
        if (threads === null) {
            console.log("hello " + user);
            socket.emit("userdata", user);
            socket.on("returnuser", data => {
                setThreads(data);
            })
        }
    }, [])

    useEffect(() => {
        if (resData) {
            if (resData.messages.length > 0) {
                resData.messages.map(el => {
                    if (el.user === otherUser) {
                        addResponseMessage(el.msg)
                    } else {
                        addUserMessage(el.msg)
                    }
                })
            }
        }
    }, [resData]);

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        if (room) {
            socket.emit("sendmsg", { newMessage, room, user });
        }
    };

    const handleResponse = useCallback((res) => {
        setResData(res);
    }, []);

    const handleCB = useCallback((childData) => {
        dropMessages();
        let roomname = childData.room;
        setOtherUser(childData.name);
        setSubtitle(childData.subject);
        setRoom(roomname);
        socket.emit('info', roomname);

        socket.on("response", data => handleResponse(data));

        return () => {
            socket.off("response", data => handleResponse(data));
        }
    }, []);

    const updateSubject = useCallback((sub, roomname) => {
        socket.emit('updateSubject', { subject: sub, room: roomname });
        setSubtitle(sub);
    }, []);

    if (threads) {
        results = threads.map(el => {
            return (
                <Thread update={updateSubject} fxn={handleCB} room={el.room} name={el.user} subject={el.subject} />
            )
        })
    }

    return (
        <>
            <Banner pageTitle="Inbox" />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {/* <h1 style={{ textAlign: "center", color: "black" }}>Inbox</h1>
                    <hr color={"black"} /> */}
                </Col>
            </Row>
            <Row style={{ marginTop: "5rem" }}>
                <Col md={4}>
                    <h3 style={{ textAlign: "center", color: "black" }}>Message Threads</h3>
                </Col>
            </Row>
            {results}
            <Widget
                title={otherUser || "Welcome"}
                subtitle={subtitle || "Select a User to begin messaging"}
                handleNewUserMessage={handleNewUserMessage}
            />
        </>
    )
}

export default Chat;