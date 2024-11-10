const express = require("express");
const app= express();
//const {adminAuth, userAuth} = require("./Middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());// middleware that convert JSON object to Javascript Object for whole code (Globally) and then add to req
app.post("/signup", async (req,res)=>{ //Pushing the data to the database

    console.log(req.body);
    // const userObj={
    //     firstName: "MS",
    //     lastName: "Dhoni",
    //     emailId: "dhoni@gmail.com",
    //     password: "DhoniBhai"
    // }

    // creating a new Instance of a User Model and passing the data(userObj) 
    // const user = new User(userObj);
    const user = new User(req.body);// req.body will be converted to Javascript Object using middleware

    try {

        await user.save();
        res.send("User added successfully");

    } catch(err)
    {
        res.status(400).send("Error Saving the user:" + err.message)
    }
    
})



connectDB().then(()=>{
    //Handle Happy Case
    console.log("Database Connection Established.....");

    app.listen(7777, ()=>{

        console.log("server is successfully listening to port 7777");
    })
}).catch(err=>{

    console.error("Error Connecting to Database", err);
   
})


