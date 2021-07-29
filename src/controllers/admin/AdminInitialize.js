const UserInitialize = require('../../models/UserInitialize');

module.exports = {
    async index(req, res) {
        if (req.user && req.user.admin) {
            const infos = await UserInitialize(req.user.displayName);
            if (infos[0].admin === 'true') {
                req.user.level = infos[0].admin_level
            }

            if (!infos[0].password) {
                res.render('admin/no-pass', {css: 'no-pass', title: 'Crie uma senha', isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: true, admin: true});
            } else {
                res.render('admin/admin', { css: 'admin', title: 'Admin', isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: true, admin: true, level: req.user.level })
            }
        } else return res.sendStatus(401).send('Não tente invadir a area de administradores');
        return;
    }
}