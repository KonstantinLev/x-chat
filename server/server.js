const express = require('express');
const socketIO = require('socket.io')
const path = require('path');
const http = require('http')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

const message = (name, text, id) => ({name, text, id});

app.use(express.static(publicPath));

io.on('connection', socket => {
    //console.log('IO connection')
    socket.on('join', (user, callback) => {
        if(!user.name || !user.room){
            return callback('Enter valid user data!')
        }
        callback({userId: socket.id})
        socket.emit('msg:new', message('Admin', `Welcome, ${user.name}!`))
    })
    socket.on('msg:create', (data, callback) => {

        if(!data){
            callback(`Message can't be empty`)
        } else {
            callback()
            io.emit('msg:new', message(data.name, data.text, data.id))
            // socket.emit('newMsg', {
            //     text: data.input,
            //     date: new Date()
            // })
        }

        // console.log('socket:createMsg', data)
        // socket.emit('newMsg', {
        //     text: data.input,
        //     date: new Date()
        // })
    })
})

server.listen(port, () => {
    console.log(`server has been started on port ${port}...`);
});