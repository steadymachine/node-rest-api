# Node API REST

## Description
API RESTful which handles GET, POST, PUT and DELETE requests. Developed with [express](https://expressjs.com)

## Installation

Clone the repo:
```
$ git clone https://github.com/partofjohan/noderestapi.git
```

Create the config.env file:
```
$ touch config/config.env
```

Add the PORT and MONGO_URI environment variables into the config.env file:
```
PORT = 3000
MONGO_URI = mongodb://<admin>:<password>@localhost/noderestapi
```
Replace ```<admin>``` and ```<password>``` with your mongoDB cluster credentials.

Install the npm packages:
```
$ npm install 
```

Run the application in development mode:
```
$ npm run dev
```
Notice at the terminal where is running the application, generally it's running on [http://localhost:3000](http://localhost:3000), and launch it 🚀.
