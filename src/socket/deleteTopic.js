module.exports = {
    async index(server) {
        const { Server, Socket } = require('socket.io');

        let options = {
            pingTimeout: 30000,
        }
        const io = new Server(server, options)

        io.on("connection", socket => {
            console.log('new conn: ', socket.id);
            socket.on('deleteTopic', async data => {
                const SearchUser = require('../models/SearchUser');
                const res = await SearchUser('username', data.user);

                if (res[0].admin === 'true' && res[0].admin_level >= 2) {
                    const deleteTopic = require('../models/deleteTopic');
                    await deleteTopic(data.lang);
                    socket.emit('resTopic', {res: true});
                } else {
                    socket.emit('resTopic', {res: false});
                }
            })
        });
    }
}