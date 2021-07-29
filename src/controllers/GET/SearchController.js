const PostsModel = require('../../models/Posts2Search');
module.exports = {
    async index(req, res) {
        const Posts = await PostsModel.index()
        let query = req.query.q.trim();
        
        const filter = req.query.filter
        const query_regExp = new RegExp(query.toLowerCase(), 'gi')
        let posts = [];
        let noposts

        req.user ? isLogged = true : isLogged = false
        
        if (filter === 'all') {
            for (let i = 0; i <Posts.length; i++) {
                const post = Posts[i];
    
                if (query_regExp.test(post.title)) {
                    posts.push(post);
                } else if (query_regExp.test(post.content)) {
                    posts.push(post);
                } else if (query_regExp.test(post.author_name)) {
                    posts.push(post);
                }
            }
        } else {
            switch (filter) {
                case 'autor':
                    for (let i = 0; i < Posts.length; i++) {
                        const post = Posts[i];
                        
                        if (query_regExp.test(post.author_name)) {
                            posts.push(post)
                        }
                    }
                    break;
                case 'title':
                    for (let i = 0; i <Posts.length; i++) {
                        const post = Posts[i];
                        

                        if (query_regExp.test(post.title)) {
                            posts.push(post);
                        }
                    }
                    break;
                case 'content':
                    for (let i = 0; i <Posts.length; i++) {
                        const post = Posts[i];
                        

                        if (query_regExp.test(post.content)) {
                            posts.push(post);
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        if (req.user) {
            res.render('search', { css: 'search', posts, title: query, query, isLogged: true, name: req.user.displayName, photo: req.user.picture, noposts: false, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.render('search', { css: 'search', posts, title: query, query, isLogged: false, noposts });
        }
    }
}