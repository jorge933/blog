const Database = require('../../config/config')

module.exports = {
    async index(req, res) {
        const id_post = req.params.id

        if (id_post && !isNaN(parseInt(id_post))) {
            const db = await Database();

            const post = await db.all('SELECT * FROM posts WHERE id = ?', [id_post]);
            await db.close();
            
            const likes = post[0].likes.trim() || ' ';
            const likesFinal = likes.split(' ');

            for (let i = 0; i < likesFinal.length; i++) {
                if (likesFinal[i] === '') {
                    likesFinal.splice(i, 1)
                }
            }

            
            if (post.length > 0) {
                let Logged;
                let name = '';
                let picture = '';
                let writer = false;
                let admin = false;
                let email = '';
                let liked = 'far'
                
                if (req.user) {
                    Logged = true;
                    name = req.user.displayName;
                    picture = req.user.picture;
                    if (req.user.writer) writer = true;
                    if (req.user.admin) admin = true
                    email = req.user.email;
                    
                    const emailRegExp  = new RegExp(req.user.email.split('@')[0], 'gi');
                    
                    if (emailRegExp.test(post[0].likes)) {
                        liked = 'fas'
                    }
                } else Logged = false;
                
                const object = { css: 'single', id_post, name_author: post[0].author_name, photo_author: post[0].author_photo, email, create: post[0].created_at, title: post[0].title, content: post[0].content, lang: post[0].lang, isLogged: Logged, name: name, photo: picture, writer, admin, liked, likes: likesFinal.length }

                res.render('single-post', object) 
            } else return res.send('Post não encontrado');
        } else {
            res.send('Post não encontrado');
        }   
    }
}