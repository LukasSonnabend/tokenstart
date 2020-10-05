const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
require("dotenv").config();

//Express setup
const app = express();
//middleware
app.use(express.json());

const PORT = process.env.PORT|| 1234

//start server
app.listen(PORT, () => console.log('Server Running on port: ' + PORT));

//setup mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, 
    (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
    }
);

// Routes setup
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use("/users", require("./routes/userRouter"));
app.use("/projects", require("./routes/projectRouter"));