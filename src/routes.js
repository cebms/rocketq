const express = require('express');

const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const questionController = new QuestionController();
const roomController = new RoomController();
const routes = express.Router();


routes.get('/', (request, response) =>{
    response.render('index', {page: 'enter-room'});
});


routes.get('/create-room', (request, response) => {
    response.render('index', {page: 'create-pass'});
});
routes.get('/room/:room', roomController.open);
routes.post('/create-room', roomController.create);
routes.post('/enter-room', roomController.enter);


routes.post('/question/create/:room', questionController.create);
routes.post('/question/:room_id/:question_id/:action', questionController.index);



module.exports = routes;