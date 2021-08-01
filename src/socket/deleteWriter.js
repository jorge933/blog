function deleteWriter(socket) {
    socket.on('cancelWriter', async data => {
        const SerchAdmin_Model = require('../models/SearchAdmin');
        const SearcAdmin_res = await SerchAdmin_Model('user', data.admin);
        
        if (SearcAdmin_res !== true) {
            const cancelWriter = require('../models/cancelWriter');
            await cancelWriter(data.cancel_writer);
            socket.emit('resCancel', true);
        } else {
            socket.emit('resCancel', false);
        }
    })
}

module.exports = deleteWriter;