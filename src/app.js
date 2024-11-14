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

        await user.save(); // saving to database
        res.send("User added successfully");

    } catch(err)
    {
        res.status(400).send("Error Saving the user:" + err.message)
    }
    
})

//Get particular user by email
app.get("/user", async (req, res)=>{
    const userEmail=req.body.emailId;

    try{

       const users =  await User.find({emailId:userEmail});
       if(users.length===0)
        {
            res.status(404).send("User not found");
        }
       else
        {
            res.send(users);
        }
      
    }

    catch(err){
        res.status(400).send("Error Getting the user:" + err.message)
    }
});

//Feed Api- GET /feet - get all users from the database

app.get("/feed", async (req,res)=>{

    try{
        const users= await User.find({});
        res.send(users);

    }
    catch(err){
        res.status(400).send("Error Getting the user:" + err.message)
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


