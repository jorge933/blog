const Database = require('../../config/config');
const md5 = require('md5');

module.exports = {
    async index(req, res) {
        const pass = req.body.pass;

        if (pass.length >= 8 && pass.length <= 20) {
            const passCrypto = md5(pass);

            const db = await Database();

            await db.run('UPDATE users SET password = ? WHERE email = ? AND admin = "true"', [passCrypto, req.user.email]);
            return res.redirect('/admin')
        }
    }
}