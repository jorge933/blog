module.exports = {
    async index(req, res) {
        const Posts_Model = require('../../models/Posts');
        const Topics_Model = require('../../models/topics');
        const posts = await Posts_Model();
        const topics = await Topics_Model.langs();
        let noposts;
        
        posts.length === 0 ? noposts = true : noposts = false

        if (req.user) {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: true, name: req.user.displayName, photo: req.user.picture, posts, topics, noposts: noposts, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.render('posts', { css: 'posts', title: 'Posts', isLogged: false, posts, topics, noposts: noposts});
        }


        // res.send(posts);
    }
}