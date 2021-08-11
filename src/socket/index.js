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
        });
    }
}