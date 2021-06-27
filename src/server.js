const express = require('express');
const routes = require('./routes');
const path = require('path');


const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.use(routes);

app.listen(3333);