module.exports = {
    async index(req, res) {
        const Topics_Model = require('../../models/topics');
        const topics = await Topics_Model.langs();
        
        if (req.user) {
            const {level, displayName:name, admin, writer, picture:photo} = req.user
            res.render('admin/manage-topics', { css: 'manage-topic-admin', title: 'Tópicos', topics, isLogged: true, level, name, photo, admin, writer });
        } else return res.redirect('/');
    }
}