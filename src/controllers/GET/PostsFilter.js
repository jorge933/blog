const Database = require('../../config/config')

module.exports = {
    async index(req, res) {
        let lang = req.params.lang;
        let noposts;

        if (lang.toLowerCase() === 'c-e-derivados') lang = 'C e derivados';

        const postsReturns = require('../../models/posts/PostsFilter');
        const Topics_Model = require('../../models/posts/topics');
        const posts = await postsReturns(lang);
        const topics = await Topics_Model.langs();

        if (posts === true) noposts = true;
        if (req.user) {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: true, name: req.user.displayName, photo: req.user.picture, posts, topics, noposts: noposts, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: false, posts, topics, noposts: noposts});
        }
    }
}