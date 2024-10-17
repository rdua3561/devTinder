const express = require("express");
const app= express();


//Once you created the server then only you can listen to the incomming requests
app.listen(7777, ()=>{

    console.log("server is successfully listening to port 7777")
})

//Request Handler for /test
app.use("/test",(req,res)=>{

    res.send("hello from the server");

});

//Request Handler
app.use("/",(req,res)=>{

    res.send("server");

});