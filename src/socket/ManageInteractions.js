const Database = require('../config/config');

function like(socket) {
    socket.on('like', async data => {
        const db = await Database();

        const email = data.email.split('@')[0];
        const emailRegExp = new RegExp(email, 'gi');
        const posts = await db.all('SELECT * FROM posts WHERE id = ?', [data.id]);
        const likers = posts[0].likes;

        if (!emailRegExp.test(likers)) {
            const likersFinal = likers.split(' ');
            likersFinal.push(email);
            likersFinal.push(' ');

            await db.run('UPDATE posts SET likes = ? WHERE id = ?', [likersFinal.join(' '), data.id]);
            await db.close();

            socket.emit('like', 1);
            return;
        } else {
            const likersFinal = likers.split(' ');
            likersFinal.splice(email);
            likersFinal.push(' ');

            await db.run('UPDATE posts SET likes = ? WHERE id = ?', [likersFinal.join(' '), data.id]);
            await db.close();

            socket.emit('withdrew-liked');
        }
    })
}

module.exports = like