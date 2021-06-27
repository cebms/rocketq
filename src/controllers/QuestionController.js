const database = require('../database/config');

class QuestionController {
    async index(request, response){
        const db = await database();
        const {
            room_id: roomId, 
            question_id: questionId, 
            action
        } = request.params
        const {password} = request.body;

        const {password: roomPassword} = await db.get(`SELECT password FROM rooms WHERE id = ${roomId}`);

        if(roomPassword == password){
            if(action === 'delete'){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
            } else if(action === 'check'){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
            }

            return response.redirect(`/room/${roomId}`);

        } else {
            response.render('passIncorrect', {roomId});
        }

    }

    async create(request, response){
        const db = await database();
        
        const {question} = request.body;
        const {room: roomId} = request.params;


        await db.run(`INSERT INTO questions (
            title,
            read,
            room
        ) VALUES (
            '${question}',
            0,
            ${parseInt(roomId)}
        )`);

        await db.close();

        response.redirect(`/room/${roomId}`);
        
    }
}

module.exports = QuestionController;