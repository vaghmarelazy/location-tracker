
const express = require('express');
const app = express();

const http = require('http');
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app); // create a server
const io = socketio(server); // initialize socket.io with the server

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",function (socket) {
    socket.on("send-location", (data)=>{
        io.emit("receive-location",{id: socket.id, ...data});
    })
    
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    })
})



app.get("/", function (req, res) {
    res.render('index')
})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});