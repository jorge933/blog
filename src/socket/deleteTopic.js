function deleteTopic(socket) {
    socket.on('deleteTopic', async data => {
        const SearchAdmin = require('../models/user/SearchAdmin');
        const res = await SearchAdmin('user', data.user);

        if (res !== true && res[0].admin === 'true' && res[0].admin_level >= 2) {
            const deleteTopic = require('../models/posts/deleteTopic');
            await deleteTopic(data.lang);
            socket.emit('resTopic', { res: true });
        } else {
            socket.emit('resTopic', { res: false });
        }
    })
}

module.exports = deleteTopic