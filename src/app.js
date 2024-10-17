const express = require("express");
const app= express();



app.listen(7777, ()=>{

    console.log("server is successfully listening to port 7777")
})

app.use("/test",(req,res)=>{

    res.send("hello from the server");

});

app.use("/",(req,res)=>{

    res.send("server");

});