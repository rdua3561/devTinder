const express = require("express");
const app= express();


//Once you created the server then only you can listen to the incomming requests
app.listen(7777, ()=>{

    console.log("server is successfully listening to port 7777")
})

// //Request Handler for /test
// app.use("/test/2",(req,res)=>{

//     res.send("hello from the serverssssssssssssss 22222222");

// });

// //Request Handler for /test
// app.use("/test",(req,res)=>{

//     res.send("hello from the server");

// });

// //Request Handler
// app.use("/",(req,res)=>{

//     res.send("server");

// });

app.use("/user",(req,res,next)=>{

    console.log("hello");

    res.send("Response 1");
    next();

}, (req,res)=>{

    console.log("hello 2");

    res.send("Response 2");

});
//Our Port will through an error when you are trying to send another response to the same URL .we have 
//already send the res to client, you can't change the request, tcp connection made b/w client and server.
//It closes the tcp connection when it gets the 1st response from the server