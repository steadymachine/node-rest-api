const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');   
const bodyParser = require('body-parser');

const User = require('./models/User');


dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

//Connection to mongo
connectDb();

//Parse incoming request body
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get('/', (request, response) => {
    response.send('Get request');
});

app.post('/', (request, response) => {
    //console.log(request.body);
    const { name, username, email, password } = request.body;
    const newUser = new User({
        name,
        username,
        email,
        password
    });
    User.create({
        name,
        username,
        email,
        password
    })
    .then((user) => {
        response.send(`${name} has been added to the database`);
    })
    .catch((error) => {
        console.log(error);
    });

    //console.log(newUser);
    //response.send('Post request');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
