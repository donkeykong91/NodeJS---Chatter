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


{const tech = io.of("/tech");


    tech.on("connection", function (socket) {


        console.log("user connected");

        socket.on("message", function (message) {


            console.log(`message: ${message}`);

            tech.emit("message", message);


        });


        socket.on("disconnect", function() {


            console.log("User disconnected");

            tech.emit("message", "User disconnected");


        });

    });

}
