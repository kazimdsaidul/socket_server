const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);


const { Server } = require('socket.io');

const io = new Server(expressServer);

// handle all event all to server
io.on('connection', function(socket) {
    console.log("New User Connected!")

    // setTimeout(function() {
    //     console.log("send message to client")
    //     socket.send("I am message from server.....")
    // }, 5000)

    // setInterval(function() {
    //     let d = new Date();
    //     let t = d.getTime();

    //     console.log("send message to client")
    //     socket.send("Current server time: " + t)
    // }, 5000)

    setInterval(function() {
        let d = new Date();
        let t = d.getTime();

        console.log("send custom event to client")
        socket.emit("myServerEvent", "Current server time: " + t)
    }, 5000)



    socket.on("disconnect", function() {
        console.log("User disconnected")
    })

})


//server redrirect to index.html file 
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

expressServer.listen(3000, function() {
    console.log("server run @3000");
})