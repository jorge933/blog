const Database = require('../../config/config');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        const pass = req.body.pass;

        if (pass.length >= 8 && pass.length <= 20) {
            const passCrypto = await bcrypt.hash(pass, 10);

            const db = await Database();

            await db.run('UPDATE users SET password = ? WHERE email = ? AND admin = "true"', [passCrypto, req.user.email]);
            
            db.close();
            return res.redirect('/admin')
        }
    }
}