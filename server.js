/****************************** import require lib *************************************/

var express = require("express");
var app = express();
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const path = require("path");
app.use(express.static("public")); //Send index.html page on GET / --> this sends get request and display index.html in screen

var Port_number; // initialize variables for portnumber

/******************* Start the server, listening on port 4000. ***********************/

var server = app.listen(4000, () => {
  console.log("Listening to requests on port 4000...");
});
/******************** Bind socket.io to our express server ******************************/

var io = require("socket.io")(server);

/*** The function below runs until the connection is secure between server and webpage ***/

io.on("connection", (socket) => {
  console.log("Someone connected."); //show a log as a new client connects.

  /*****socket.on receives message from the webpage like port-number that we entered*****/

  socket.on("message", function (msg) {
    Port_number = msg; //msg contains the port-number we entered
    const port = new SerialPort({ path: Port_number, baudRate: 9600 }); //make connection with port
    const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" })); //parse data until new line is detected
    parser.on("data", (data) => {
      //thus parse data is send to the variable->data
      const dataArray = data.split(","); //the data we received is string so we converted it into array for representation in graph
      console.log(dataArray); //displays array to command prompt
      io.sockets.emit("dataArray", { dataArray }); // send data to webpage ie to script.js using socket.js
    });
  });
});
/*
NOTE::
Code for client side (WEBPAGE) is in folder public
*/
