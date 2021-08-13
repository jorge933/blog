const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();

        const SeachUser = require('../../models/user/SearchUser');
        const users = await SeachUser('email', req.user.displayName);
        
        if (users.length !== true) {
            const infos = req.user;
            
            await db.run('INSERT INTO users(username, photo, writer, admin, admin_level, email) VALUES(?, ?, ?, ?, ?, ?)', [infos.displayName, infos.picture, "false", "false", 0, infos.email]);
        } else await db.run('UPDATE users SET photo = ? WHERE email = ?', [infos.picture, infos.email]);
        
        await db.close();
        return res.redirect('/');
    }
}