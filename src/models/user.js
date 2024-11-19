const mongoose = require("mongoose");
const validator =require("validator");
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:4,
        maxLength:20,
        match:/^[a-zA-Z]+$/, // only letters are allowed

    },
    lastName:{  
        type:String
    },
    emailId:{
        type:String,
        required: true,
        unique:true,
        lowercase: true, // every letter that  user enter will become becomes small
        trim:true, // white spaces removed
        validate(value){ 
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email Address:" + value);
            }
        }
        
    },
    password:{
        type:String,
        required: true,
        validate(value){ 
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Please Enter Strong Password:" + value);
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){  //custom validation for gender
            if(!["male", "female", "others"].includes(value));
            {
                throw new Error("Gender should be among's Male, Female or Other");
            }
        },
    },
    photoUrl:{
        type:String,
        default: "https://i.stack.imgur.com/l60Hf.png",
        validate(value){ 
            if(!validator.isURL(value))
            {
                throw new Error("Invalid Photo URL:" + value);
            }
        }
    },
    about:{
        type: String,
        default: "Hello, I am a new user on Dev-Tinder!"
    },
    skills:{
        type: [String],
    }

}, 
{
 timestamps:true
});

module.exports = mongoose.model("User",userSchema);
