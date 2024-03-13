const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const router = require('./routes/routes')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT||5000;

//using the static folder
app.use(express.static('public'));

//middlewares
app.use(expressEjsLayouts)
app.set('view engine','ejs');
app.set('layout', './layouts/main');

//setting up the routes
app.use('/',router);

app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})