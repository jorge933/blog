const Database = require('../../config/config');
const md5 = require('md5');

module.exports = {
    async index(req, res) {
        const db = await Database();
        // if (!req.user || !req.user.admin) return res.redirect('/');

        const newAdmin = req.body.email;
        const newAdminLevel = req.body.level;
        const adminPass = md5(req.body.adminPass);

        if (newAdmin === req.user.email) return res.redirect('/');

        if (newAdmin.length < 5 || adminPass.length < 5) return res.redirect('/');

        if (parseInt(newAdminLevel) < 1 || parseInt(newAdminLevel) > 3) return res.redirect('/');
        const existEmail = await db.all('SELECT * FROM users WHERE email = ?', [newAdmin]);
        const admin = await db.all('SELECT * FROM users WHERE email = ? AND admin = "true"', [req.user.email]);

        if (existEmail.length > 0 && existEmail[0].admin === 'false') {
            
            if (adminPass === admin[0].password && admin[0].admin_level === 3) {
                await db.run('UPDATE users SET writer = "true", admin = true, admin_level = ? WHERE email = ?', [newAdminLevel, newAdmin]);
                return res.redirect('/admin');
            } else return res.redirect('/');

        } else return res.redirect('/');

        return;
    }
}