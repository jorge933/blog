module.exports = {
    async index(server) {
        const { Server, Socket } = require('socket.io');
        const deleteTopic = require('./deleteTopic');
        const confirmWriter = require('./confirmWiter');
        const deleteWriter = require('./deleteWriter');
        const deletePost = require('./deletePost');
        const ManageInteractions = require('./ManageInteractions');

        let options = {
            pingTimeout: 30000,
        }
        const io = new Server(server, options);

        io.on("connection", async socket => {
            deleteTopic(socket);
            deleteWriter(socket);
            confirmWriter(socket);
            deletePost(socket);
            ManageInteractions(socket);
            const Database = require('../config/config')

            socket.on('new_name', async data => {
                const db = await Database();

                const ExistUser = await db.all('SELECT * FROM users WHERE username = ?', [data]);

                ExistUser.length === 0 ? socket.emit('user_exist', 1) : socket.emit('user_exist', 2)
            })
        });
    }
}