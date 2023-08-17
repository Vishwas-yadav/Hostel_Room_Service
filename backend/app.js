const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.use("/api", require('./routes'));


//db connection.
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDb connected");
    })
    .catch(err => {
        console.log("Error connecting with mongoDb:", err);
    });


    //express server
app.listen(port, () => {
    console.log("Login Service Server Started on Port:", port);
});