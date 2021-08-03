const Database = require('../../config/config')

module.exports = {
    async index(req, res) {
        const id_post = req.params.id

        if (id_post && !isNaN(parseInt(id_post))) {
            const db = await Database();

            const post = await db.all('SELECT * FROM posts WHERE id = ?', [id_post]);
            await db.close();

            if (post.length > 0) {
                let Logged;
                let name = '';
                let picture = '';
                let writer = false;
                let admin = false;

                if (req.user) {
                    Logged = true;
                    name = req.user.displayName;
                    picture = req.user.picture;
                    if (req.user.writer) writer = true;
                    if (req.user.admin) admin = true
                } else Logged = false


                const object = { css: 'single', id_post, name_author: post[0].author_name, photo_author: post[0].author_photo, create: post[0].created_at, title: post[0].title, content: post[0].content, lang: post[0].lang, isLogged: Logged, name: name, photo: picture, writer, admin }

                res.render('single-post', object) 
            } else return res.send('Post não encontrado');
        } else {
            res.send('Post não encontrado');
        }   
    }
}