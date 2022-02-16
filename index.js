const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);


const { Server } = require('socket.io');

const io = new Server(expressServer);

let sellGroup = io.of("/sell_group")

let buyGroup = io.of("/buy_group")

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





    socket.on('message', function(data) {
        console.log("message recive------" + data)
    })



    socket.on("disconnect", function() {
        console.log("User disconnected")
    })

})

sellGroup.on('connection', function(socket) {
    console.log("New User Connected! --- sell group---")

    setInterval(function() {
        let total = Math.random()
        console.log("Sell group people send")
        sellGroup.emit("totalSellEvent", "Total Sell: " + total)
    }, 2000)

    socket.on("disconnect", function() {
        console.log("User disconnected--- sell group---")
    })
})

buyGroup.on('connection', function(socket) {
    console.log("New User Connected! --- buy group---")

    setInterval(function() {
        let total = Math.random()
        console.log("buy send")
        buyGroup.emit("totalBuyEvent", "Total buy: " + total)
    }, 3000)

    socket.on("disconnect", function() {
        console.log("User disconnected--- buy group---")
    })
})




//server redrirect to index.html file 
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

expressServer.listen(3000, function() {
    console.log("server run @3000");
})