const database = require('../database/config')

class RoomController {
    async create(request, response){
        const db = await database();
        const {password} = request.body;
        
        let roomId = '';
        let isRoom = true;

        while(isRoom){
            roomId = '';
            for(let i=0; i<6; i++){
                roomId += Math.floor(Math.random() * 10).toString();
            }
    
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
    
            isRoom = roomsExistIds.some(roomsExistId => roomsExistId.id === roomId);
        }

        await db.run(`INSERT INTO rooms (
            id,
            password
        ) VALUES (
            ${Number(roomId)},
            '${password}'
        )`);


        await db.close();

        response.redirect(`/room/${roomId}`);
    }

    async open(request, response) {
        const db = await database();
        const {room: roomId} = request.params;

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`);
        const readQuestions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`);

        let isEmpty = false;

        if(questions.length === 0 && readQuestions.length === 0){
            isEmpty = true;
        }

        response.render('room', {roomId, questions, readQuestions, isEmpty});
    }

    enter(request, response){
        const {roomId} = request.body;

        response.redirect(`/room/${roomId}`);
    }
}

module.exports = RoomController;