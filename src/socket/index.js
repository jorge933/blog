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
            deleteTopic(socket);
            deleteWriter(socket);
            confirmWriter(socket);
            const SerchAdmin_Model = require('../models/SearchAdmin');
            const managePost = require('../models/managePost');

            socket.on('deletePost', async data => {
                const SearcAdmin_res = await SerchAdmin_Model('user', data.user);
                
                if (SearcAdmin_res[0].lenth > 0) {
                    await managePost.deletePost(data.id);
                    socket.emit('resDeletePost', true);
                } else {
                    const posts = await managePost.deletePost2(data.user, data.id);
                    if (posts[0].author_name === data.user) {
                        await managePost.deletePost(data.id);
                        socket.emit('resDeletePost', true);
                    }
                }

                return socket.emit('resDeletePost', false);
            });
        });
    }
}