const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();
        
        const SeachUser = require('../../models/SearchUser');
        const users = await SeachUser('user', req.user.displayName);

        if (users.length === 0) {
            const infos = req.user;

            await db.run('INSERT INTO users(username, photo, writer, admin, admin_level, email) VALUES(?, ?, ?, ?, ?, ?)', [infos.displayName, infos.picture, "false", "false", 0, infos.email]);
            await db.close();
        }

        return res.redirect('/')
    }
}