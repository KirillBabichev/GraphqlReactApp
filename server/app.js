const express = require('express');
const  { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3005;

const { DB_URL, DB_USER_NAME, DB_CLUSTER, DB_NAME, DB_CONFIG } = process.env;
const DB_CONNECT_URL = `${DB_URL}://${DB_USER_NAME}:${DB_CLUSTER}/${DB_NAME}?${DB_CONFIG}`

mongoose.connect(DB_CONNECT_URL, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connection to DB!'));

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server started on: ${PORT} port`)
});
