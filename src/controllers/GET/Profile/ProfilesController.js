const Database = require('../../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();

        const userParam = req.params.user.toLowerCase();
        const User = await db.all('SELECT * FROM users WHERE username like ?', [userParam]);
        let posts;
        let noposts = false;

        if (User.length > 0) {
            posts = await db.all('SELECT * FROM posts WHERE author_name = ? ORDER BY id', [userParam]);
        } else return res.send('Usuário não encontrado!');

        await db.close();

        const PostLength = posts.length;

        if (posts.length > 0) {
            posts.splice(4, posts.length - 4);
            posts = posts.reverse();
        } else noposts = true;

        if (req.user) {
            return res.render('profile', { css: 'profile', title: req.params.user, User, posts: posts, PostLength, noposts, isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: req.user.writer, admin: req.user.admin });
        } else {
            return res.render('profile', { css: 'profile', title: req.params.user, isLogged: false, User, posts: posts, PostLength, noposts });
        }
    }
}