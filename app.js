'use strict';

const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');   
const router = require('./routes/router');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

//Connection to mongo
connectDb();

app.get('/',(request, response) => {
    response.send(`Node API RESTful <br> Go to <a href="http://localhost:${PORT}/api/users">API</a>`); 
});

//Routes
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

//404 handler
app.use((request, response, next) => {
    response.status(404).send("Sorry, request was not found 🤔");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
