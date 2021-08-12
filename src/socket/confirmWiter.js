function confirmWriter(socket) {
    socket.on('confirmWriter', async data => {
        const SerchAdmin_Model = require('../models/posts/SearchAdmin');
        const SearcAdmin_res = await SerchAdmin_Model('user', data.admin);
        
        if (SearcAdmin_res !== true) {
            const newWriter = require('../models/writer/newWriter');
            await newWriter(data.new_writer);
            socket.emit('resConfirm', true);
        } else {
            socket.emit('resConfirm', false);
        }
    })
}

module.exports = confirmWriter