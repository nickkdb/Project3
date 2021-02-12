const form= document.getElementById('form');
const msgBox= document.getElementById('message');
const chatBox= document.getElementById('messages');

const socket= io('localhost:8080');
const msgArr= [];
let user= prompt('Enter you username');
let room= prompt("enter room you wish to join");
socket.emit('info', {user: user, room: room});
// socket.emit('room', room);

socket.on('message', (data) => {
    const liTag= document.createElement('li');
    liTag.classList.add('list-item');
    liTag.innerHTML= `<strong>${data.sender}: </strong> ${data.msg}`;
    msgArr.push(data.msg);
    console.log(msgArr);

    chatBox.appendChild(liTag);
})

socket.on('savedmsgs', (data) => {
    console.log(data);
    data.map(el => {
    const liTag= document.createElement('li');
    liTag.classList.add('list-item');
    liTag.innerHTML= `<strong>${el.user}: </strong> ${el.msg}`;

    chatBox.appendChild(liTag);
    })
})

socket.on('userjoin', (msg) => {
    const liTag= document.createElement('li');
    liTag.classList.add('list-item');
    liTag.innerText= msg;

    chatBox.appendChild(liTag);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('event', {sender: user, room: room, msg: msgBox.value})
    // socket.emit('message', msgBox.value);
    msgBox.value= ''
})