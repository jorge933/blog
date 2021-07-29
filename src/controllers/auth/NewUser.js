const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();

        const users = await db.all('SELECT * FROM users WHERE username = ? AND photo = ?', [req.user.displayName, req.user.picture]);

        if (users.length === 0) {
            const infos = req.user

            await db.run('INSERT INTO users(username, photo, writer, admin, admin_level, email) VALUES(?, ?, ?, ?, ?, ?)', [infos.displayName, infos.picture, "false", "false", 0, infos.email]);
        }

        return res.redirect('/')
    }
}