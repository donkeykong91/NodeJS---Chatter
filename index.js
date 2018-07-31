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


        socket.on("join", function (data) {


            socket.join(data.room);

            tech.in(data.room).emit("message", `New user joined ${data.room} room!`);


        });


        socket.on("message", function (data) {


            console.log(`message: ${data.message}`);

            tech.in(data.room).emit("message", data.message);


        });


        socket.on("disconnect", function() {


            console.log("User disconnected");

            tech.emit("message", "User disconnected");


        });

    });

}
