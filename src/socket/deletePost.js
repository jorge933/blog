
function deletePost(socket) {
    const SerchAdmin_Model = require('../models/user/SearchAdmin');
    const managePost = require('../models/posts/managePost');

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
}

module.exports = deletePost