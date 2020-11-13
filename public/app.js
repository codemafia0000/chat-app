const socket = io();
const form = document.querySelector('form');
const inputField = document.querySelector('#input-field');
const messages = document.querySelector('#messages');

const msgHandler = (msg, recieved) => {
    messages.innerHTML += `<li class="msg ${recieved ? 'recieved' : ''}"><span>${msg}</span></li>`
    const children = messages.querySelectorAll('li');
    const lastChild = children[children.length - 1];
    lastChild.scrollIntoView({ behavior: 'smooth' });
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = inputField.value;
    msgHandler(msg);
    socket.emit('sendmsg', { msg });
    inputField.value = '';
})

socket.on('connect', function () {
    socket.emit('enter', { msg: `入室しました。` });
});

socket.on('sendmsg', function (data) {
    msgHandler(data.msg, true);
});
