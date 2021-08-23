const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();

        const SearchUser_model = require('../../models/user/SearchUser');
        const user = await SearchUser_model('email', req.user.email);
        const infos = req.user;

        if (user === true) {
            await db.run('INSERT INTO users(username, photo, writer, admin, admin_level, email) VALUES(?, ?, ?, ?, ?, ?)', [infos.displayName, infos.picture, "false", "false", 0, infos.email]);
        } else {
            req.user.displayName = user[0].username;
            await db.run('UPDATE users SET photo = ? WHERE email = ?', [infos.picture, infos.email]);
            await db.run('UPDATE posts SET author_photo = ? WHERE email = ?', [infos.picture, infos.email])
        }

        
        await db.close();
        return res.redirect('/');
    }
}