const express = require('express');
const socketIO = require('socket.io')
const path = require('path');
const http = require('http')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('IO connection')
    socket.on('createMsg', (data) => {
        console.log('socket:createMsg', data)
        socket.emit('newMsg', {
            text: data.input,
            date: new Date()
        })
    })
})

server.listen(port, () => {
    console.log(`server has been started on port ${port}...`);
});