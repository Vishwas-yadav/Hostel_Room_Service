const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config'); // Path to your swagger-config.js


const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.use("/api", require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Write Swagger specification to a JSON file
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf8');

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