const app           = require("express")();

const server        = require("http").Server(app);

const io            = require("socket.io")(server);

const port          = 3000;


server.listen(port, function () {

    console.log(`Server is running on port ${port}`);
    
});


app.get("/", function (request, respond) {

    respond.sendFile(__dirname + "/public/index.html");

});

io.on("connection", function (socket) {


    console.log("User connected");

    socket.emit("message", {manny: "Hey how are you?"});

    
    socket.on("another event", function (data) {

        console.log(data);

    });

});