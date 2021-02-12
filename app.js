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

    const { name, username, email, password } = request.body;

    //Query if username or email are already used
    User.find({ $or: [ { username }, { email } ] })
        .then((user) => {

            //If the object is empty the registration is efectuated
            if(Object.keys(user).length === 0) {
                
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
            } else {
                //If two objects are founded that means the 
                //username and email are already registered
                if(user.length > 1) {
                    response.send(`username and email already registered!`);
                } else {
                    //Verify either if the username is already registered or the email
                    if(user[0].username === username) {
                        response.send(`username already registered.`);
                    } else {
                        response.send(`email already registered.`);
                    }
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });


    //console.log(newUser);
    //response.send('Post request');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
