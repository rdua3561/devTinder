const express = require("express");
const app= express();
const {adminAuth, userAuth} = require("./Middlewares/auth");

//Once you created the server then only you can listen to the incomming requests
app.listen(7777, ()=>{

    console.log("server is successfully listening to port 7777")
})


app.use("/admin", adminAuth);

app.get("/user/login", (req,res) => {

    res.send("User loggedIn Successfully");
})

app.get("/user/data", userAuth, (req,res) => {

    res.send("User Data Sent");
})

app.get("/admin/deleteUser", (req,res) => {

    res.send("User Deleated Successfully")
})

app.get("/admin/getAllUser", (req,res) => {
    res.send("All user Data send Successfully")
})
