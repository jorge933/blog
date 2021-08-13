const Database = require('../../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();

        const userParam = req.params.user.toLowerCase();
        const User = await db.all('SELECT * FROM users WHERE username like ?', [userParam]);
        let Posts;
        let noposts = false;

        if (User.length > 0) {
            Posts = await db.all('SELECT * FROM posts WHERE author_name = ? ORDER BY id', [userParam]);
        } else return res.send('Usuário não encontrado!');

        await db.close();

        const PostLength = Posts.length;

        if (Posts.length > 0) {
            Posts.splice(4, Posts.length - 4);
            Posts = Posts.reverse();
        } else noposts = true;

        if (req.user) {
            return res.render('profile', { css: 'profile', title: req.params.user, User, Posts, PostLength, noposts, isLogged: true, name: req.user.displayName, photo: req.user.picture });
        } else {
            return res.render('profile', { css: 'profile', title: req.params.user, isLogged: false, User, Posts, PostLength, noposts });
        }
    }
}