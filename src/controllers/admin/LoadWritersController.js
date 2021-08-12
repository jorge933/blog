module.exports = {
    async index(req, res) {
        if (req.user && req.user.admin && req.user.level >= 2) {
            const loadWriters_Model = require('../../models/writer/LoadWriters');
            const writers = await loadWriters_Model.load();
            const { displayName:name, picture:photo } = req.user;

            if (writers.length > 0) {
                res.render('admin/new-writers', { css: 'new-writers-admin', title: 'Novos escritores', isLogged: true, name, photo, writer: true, admin: true, level: req.user.level, writers, noWriters: false });
            } else {
                res.render('admin/new-writers', { css: 'new-writers-admin', title: 'Novos escritores', isLogged: true, name, photo, writer: true, admin: true, level: req.user.level, writers, noWriters: true });
            }
        } else return res.redirect('/')
    }
}