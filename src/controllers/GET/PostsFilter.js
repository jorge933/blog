const Database = require('../../config/config')

module.exports = {
    async index(req, res) {
        const db = await Database();
        let lang = req.params.lang;
        let noposts;

        if (lang.toLowerCase() === 'C-e-derivados') lang = 'C e derivados';

        const posts = await db.all('SELECT * FROM posts WHERE lang like ?', [lang]);
        if (posts.length === 0) noposts = true
        if (req.user) {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: true, name: req.user.displayName, photo: req.user.picture, posts: posts, noposts: noposts, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: false, posts: posts, noposts: noposts});
        }
    }
}