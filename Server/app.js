const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config({path:"./store.env"});

app.use(express.json());
app.use(cors("*"));

const Dbconnect = require("./DB/Dbconnect");

// User Router
const userRouter = require("./Routes/UserRoutes/userRoutes");
app.use("/user/api",userRouter);

// Pet Router
const PetRouter = require("./Routes/PetRoutes/PetRoutes");
app.use("/api",PetRouter);


Dbconnect()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server is listening");
    
})