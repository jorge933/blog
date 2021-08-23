const Database = require('../../config/config');

module.exports = {
    async index(req, res) {

        const {new_name, old_name} = req.body;

        if(!req.user) return res.redirect(`/user/${old_name}`);
        
        if(new_name.length < 5) return res.redirect(`/user/${old_name}`)

        const db = await Database();

        if (!req.user.displayName === old_name) return res.redirect(`/user/${old_name}`);

        const ExistNick = await db.all('SELECT * FROM users WHERE username = ?', [new_name]);

        if (ExistNick.length === 0) {
            await db.run('UPDATE users SET username = ? WHERE username = ?', [new_name, old_name]);
            await db.run('UPDATE posts SET author_name = ? WHERE author_name = ?', [new_name, old_name]);
            await db.run('UPDATE new_writers SET user = ? WHERE user = ?', [new_name, old_name]);
            await db.close();

            req.user.displayName = new_name

            return res.redirect(`/user/${new_name}`);
        } else return res.redirect(`/user/${old_name}`);
    }
}