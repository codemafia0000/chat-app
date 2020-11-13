const express = require('express')
const path = require('path');
const app = express()
const server = require('http').createServer(app)
const port = 3001

const io = require('socket.io')(server);

io.on('connection', client => {
    client.on('enter', data => {
        console.log(data.msg);
    });
    client.on('sendmsg', data => {
        console.log(data.msg);
        client.broadcast.emit('sendmsg', data);
    });
    
});

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})