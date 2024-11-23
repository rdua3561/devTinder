const express = require("express");
const app= express();
//const {adminAuth, userAuth} = require("./Middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

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
   

    try {
       
        //Validation of Data
          validateSignUpData(req);

        
        const {firstName, lastName, emailId, password} = req.body; // req.body will be converted to Javascript Object using middleware

        // Encrypt the Password
        const passwordHash = await bcrypt.hash(password,10); // creating PasswordHash
        console.log(passwordHash);

        //creating a new instance of the user Model
        const user = new User({

        firstName,
        lastName,
        emailId,
        password: passwordHash //storing  PasswordHash

        });
        await user.save(); // saving to database
        res.send("User added successfully");

    } catch(err)
    {
        res.status(400).send("ERROR: " + err.message)
    }
    
})

app.post("/login", async (req, res)=>{
    try{
        const {emailId, password}=req.body;

        const user = await User.findOne({emailId:emailId});

        if(!user)
        {
            throw new Error("Invalid Credentials");// email not present in database
        }

        const isPasswordValid=await bcrypt.compare(password, user.password);

        if(isPasswordValid)
        {
            res.send("User Logged In Successfully");
        }
        else
        {
            throw new Error("Invalid Credentials"); //password incorrect
        }
     
      
    }

    catch(err){
        res.status(400).send("Error LoggedIn the user:" + err.message)
    }
});

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

//Update data of the User
app.patch("/user/:userId", async (req,res)=>
{
    const userId= req.params?.userId;
    const data= req.body;

  
    try{

        const ALLOWED_UPDATES=[
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    
        if(!isUpdateAllowed)
        {
            throw new Error("Update Not Allowed");
        }
        if(data?.skills.length>10)
        {
            throw new Error("Skills can not be more than 10");
        }

        //await User.findByIdAndUpdate({_id:userId}, data);
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument:"after",
            runValidators:true,
        });
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Error updating the user:" + err.message)
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


