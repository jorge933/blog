module.exports = {
    async index(req, res, next) {
        if (!req.user) return res.redirect('/');
        const { newTitle:title, newDescription:desc, id  } = req.body;
        const Post2Edit = require('../../models/posts/Post2Edit');
        const post = await Post2Edit(id);
        
        
        if (post[0].author_name === req.user.displayName) {
            const EditPost = require('../../models/posts/EditPost');
            await EditPost(title, desc, id, req.user.displayName);
            
            return res.redirect(`/post/${post[0].id}`);
        } else return res.redirect('/');

        res.sendStatus(500).send('Erro interno')
    }
}