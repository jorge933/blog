module.exports = {
    async index(server) {
        const { Server, Socket } = require('socket.io');
        const deleteTopic = require('./deleteTopic');
        const confirmWriter = require('./confirmWiter');
        const deleteWriter = require('./deleteWriter')

        let options = {
            pingTimeout: 30000,
        }
        const io = new Server(server, options);

        io.on("connection", async socket => {
            await deleteTopic(socket);
            await deleteWriter(socket);
            await confirmWriter(socket);
        });
    }
}