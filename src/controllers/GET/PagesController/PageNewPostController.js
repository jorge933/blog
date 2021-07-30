module.exports = {
    async index(req, res) {
        if (req.user && req.user.writer) {
            const Topics_Model = require('../../../models/topics');
            const topics = await Topics_Model.langs();
            return res.render('new-post', {
                 css: 'new-post', title: 'Novo Post', isLogged: true,
                 name: req.user.displayName, photo: req.user.picture,
                 writer: req.user.writer, admin: req.user.admin, topics});
        } else return res.redirect('/')
    }
}