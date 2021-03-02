# Node API REST

## Description
API RESTful which handles GET, POST, PUT and DELETE requests. Developed with the [express](https://expressjs.com) framework and mongoDB, a key aspect of the API is the security, password uniqueness is generated adding a salt in the hashing process.

## Installation

Clone the repo:
```
$ git clone https://github.com/partofjohan/node-rest-api.git
```

Move to the project folder
$ cd node-rest-api

Create the config.env file:
```
$ touch config/config.env
```

Add the PORT and MONGO_URI environment variables into the config.env file:
```
PORT = 3000
MONGO_URI = mongodb+srv://<admin>:<password>@<clusterAddress>/<dbName>?retryWrites=true&w=majority   
```
Replace ```<admin>```, ```<password>```, ```<clusterAddress>``` and ```<dbName>``` with your mongoDB cluster credentials.

Install the npm packages:
```
$ npm install 
```

Run the application in development mode:
```
$ npm run dev
```
Notice at the terminal where is running the application, generally it's running on [http://localhost:3000](http://localhost:3000), and launch it 🚀. Now you can make a GET request from your favorite web browser or make GET, POST, PUT and DELETE requests from an API request builder like [Postman](https://www.postman.com).
