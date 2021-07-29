module.exports = {
    async index(req, res) {
        const Posts_Model = require('../../models/Posts');
        const posts = await Posts_Model();
        let noposts;
        
        posts.length === 0 ? noposts = true : noposts = false

        if (req.user) {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: true, name: req.user.displayName, photo: req.user.picture, posts, noposts: noposts, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: false, posts, noposts: noposts});
        }


        // res.send(posts);
    }
}