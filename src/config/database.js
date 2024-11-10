const mongoose=require("mongoose");

const connectDB = async()=> {
    // connecting to the cluster 
    await  mongoose.connect("mongodb+srv://rdua3561:Zg2KxVWG0hlQoqwq@nodetesting.rcw5v.mongodb.net/devTinder");
};

module.exports = connectDB;
