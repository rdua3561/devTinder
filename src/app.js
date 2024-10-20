const express = require("express");
const app= express();


//Once you created the server then only you can listen to the incomming requests
app.listen(7777, ()=>{

    console.log("server is successfully listening to port 7777")
})


app.use("/admin", (req, res,next)=>{
    const token="xyz";
    const isAdminAuthorized= token==="xyz";

    if(!isAdminAuthorized)
    {
        res.status(401).send("Unauthorized");
    }
 
    else{
       next();
    }

});

app.get("/user", (req,res) => {
// this will not check isAdminAuthorized
    res.send("User Data Sent");
})

app.get("/admin/deleteUser", (req,res) => {

    res.send("User Deleated Successfully")
})

app.get("/admin/getAllUser", (req,res) => {
    res.send("Data send Successfully")
})
