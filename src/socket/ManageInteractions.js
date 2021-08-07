const Database = require('../config/config');

function like(socket) {
    socket.on('like', async data => {
        const db = await Database();

        const SearchUser = require('../models/SearchUser');
        const userInfos = await SearchUser('id', data.userID);
        const email = userInfos[0].email.split('@')[0]
        const emailRegExp = new RegExp(email, 'gi');
        const posts = await db.all('SELECT * FROM posts WHERE id = ?', [data.id]);
        const likers = posts[0].likes;
        const notLike = posts[0].deslikes

        if (!emailRegExp.test(likers)) {
            if (!emailRegExp.test(notLike)) {
                const likersFinal = likers.split(' ');
                likersFinal.push(email);
                likersFinal.push(' ');

                await db.run('UPDATE posts SET likes = ? WHERE id = ?', [likersFinal.join(' '), data.id]);
                await db.close();
                ;
                socket.emit('like', 1);
                return;
            } else {
                const notLikeFinal = notLike.split(' ');
                notLikeFinal.splice(email, 1);
                const likersFinal = likers.split(' ');
                likersFinal.push(email);
                likersFinal.push(' ');

                await db.run('UPDATE posts SET likes = ?, deslikes = ? WHERE id = ?', [likersFinal.join(' '), notLikeFinal.join(' '), data.id]);
                await db.close();
                ;
                socket.emit('like', 2);
            }
        } else {
            const likersFinal = likers.split(' ');
            likersFinal.splice(email);
            likersFinal.push(' ');

            await db.run('UPDATE posts SET likes = ? WHERE id = ?', [likersFinal.join(' '), data.id]);
            await db.close();
            ;
            socket.emit('withdrew-liked');
        }
    })
}

module.exports = { like }