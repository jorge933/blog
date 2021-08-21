const Database = require('../../../config/config');

module.exports = {
    async index(req, res) {
        const db = await Database();
        
        const { user } = req.params;

        const posts = await db.all('SELECT * FROM posts WHERE author_name = ?', [user]);
        await db.close()
        
        const noposts = posts.length === 0 ? true : false;

        
        if (req.user) {
            const {displayName:name, picture:photo, writer, admin} = req.user;
            return res.render('posts-user', {css: 'profilePosts', title: `Posts de ${user}`, posts, noposts, isLogged: true, name, photo, writer, admin});
        } else {
            return res.render('posts-user', {css: 'profilePosts', title: `Posts de ${user}`, posts, noposts, isLogged: false})
        }
    }
}