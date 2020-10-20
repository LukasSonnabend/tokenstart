const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require('body-parser');


var cors = require('cors');
require("dotenv").config();

//Express setup
const app = express();

app.use(express.static(path.join(__dirname, 'build')))


//middleware
app.use(express.json({limit: '10mb', 
type:'application/json'}));

const PORT = process.env.PORT|| 1234

//set body parser
  app.use(bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 10000,
    type:'application/x-www-form-urlencoded',
    extended: true 
  }));
  
  

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
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

