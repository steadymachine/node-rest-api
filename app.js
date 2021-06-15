const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');   
const bodyParser = require('body-parser');

const User = require('./models/User');


//This import will be relocated into other file
const hashPassword = require('./components/password');

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

//Connection to mongo
connectDb();

//Parse incoming request body
app.use(bodyParser.urlencoded({ extended: false }));

//Routes

//GET request
app.get('/',(request, response) => {
    response.send(`Node API RESTful <br> Go to <a href="http://localhost:${PORT}/api/users">API</a>`); 
})

app.get('/api/users', (request, response) => {
    User.find({}, 'username name email')
        .then((result) => {
            response.json(result); 
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get('/api/user/:user', (request, response) => {
    //Query the user
    const { user } = request.params;
    User.findOne({ username: user })
        .then((result) => {
            //Verify if any user was found
            if(!result) {
                response.send(`${user} was not found`);
            } else {
                response.json(result);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

//POST request
app.post('/api/users', async (request, response) => {

    const { name, username, email, password } = request.body;
    
    try {
        //Query if username or email are already used
        const user = await User.find({ $or: [ { username }, { email } ] });

        //If the object is empty the registration is efectuated
        if (Object.keys(user).length === 0) {
            //A secure password is generated through the
            //asynchronous function hashPasword
            const securePassword = await hashPassword(password);
            
            await User.create({
                name,
                username,
                email,
                password: securePassword
            })
                .then((user) => {
                    response.send(`${name} has been added to the database`);
                })
                .catch((error) => {
                    throw error;
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
    } catch (error) {
        response.send(`Oops, an error has occurred... 🥺`);
    } 
});

//PUT request
app.put('/api/users', async (request, response) => {
    try {
        const { name, username, email, password } = request.body;
    
        //A secure password is generated with the hashPassword function
        const securePassword = await hashPassword(password);

        const update = await User.updateOne({ username }, {name, email, password: securePassword});

        //Verify if the PUT action is efectuated
        if (update.n === 0) {
            response.send(`${username} was not found`);
        } else {
            response.send(`${username} has been updated`);
        }   
    } catch(error) {
        response.send(`Oops, an error has occurred... 🥺`);
    }
    
});

//DELETE request
app.delete('/api/users', (request, response) => {
    const { username } = request.body;
    User.deleteOne({ username })
        .then((user) => {
            response.send(`${user} has been removed completely from the database`);
        })
        .catch((error) => {
            console.error(error);
        });
});

//404 handler
app.use((request, response, next) => {
    response.status(404).send("Sorry, request was not found 🤔");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
