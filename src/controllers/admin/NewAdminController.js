const Database = require('../../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        const db = await Database();
        if (!req.user || !req.user.admin) return res.redirect('/');

        const newAdmin = req.body.email;
        const newAdminLevel = req.body.level;
        const adminPass = req.body.adminPass;

        if (newAdmin === req.user.email) return res.redirect('/');

        if (newAdmin.length < 5 || adminPass.length < 5) return res.redirect('/');

        if (parseInt(newAdminLevel) < 1 || parseInt(newAdminLevel) > 3) return res.redirect('/');
        const ExistEmail_model = require('../../models/SearchUser');
        const existEmail = await ExistEmail_model('email', newAdmin);
        const SearchAdmin = require('../../models/SearchAdmin');
        const admin = await SearchAdmin('email', req.user.email);

        if (admin === true) return res.redirect('/');
        if (existEmail === true) return res.redirect('/');

        if (existEmail.length > 0 && existEmail[0].admin === 'false') {
            const compare = await bcrypt.compare(adminPass, admin[0].password);
            
            if (compare && admin[0].admin_level === 3) {
                await db.run('UPDATE users SET writer = "true", admin = "true", admin_level = ? WHERE email = ?', [newAdminLevel, newAdmin]);
                
                await db.close();
                return res.redirect('/admin');
            } else return res.redirect('/');

        } else return res.redirect('/');

        return;
    }
}