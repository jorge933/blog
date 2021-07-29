const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        const infos = req.user
        const lang = req.body.language
        const expReg = new RegExp(lang, 'gi');
        const langsExist = 'Assembly C e derivados CSS Dart Go HTML Java JavaScript Kotlin Matlab Objective-C PHP R Ruby SQL Swift TypeScript'
        
        if (title && content) {
            if (expReg.test(langsExist)) {
                if (!infos || !infos.writer) res.redirect('/');
                const db = await Database();
                const created_at = new Date();

                let date = `${created_at.getDate()}`;
                let month = `${created_at.getMonth() + 1}`
                let hours = created_at.getHours();
                let minutes = created_at.getMinutes();

                if (date > 0 && date <= 9) date = `0${created_at.getDate()}`;
                if (month > 0 && month <= 9) month = `0${created_at.getMonth() + 1}`;
                if (hours > 0 && hours <= 9) hours = `0${created_at.getHours() - 3}`;
                if (minutes > 0 && minutes <= 9) minutes = `0${created_at.getMinutes()}`;

                const create = `Criado em ${date}/${month}/${created_at.getFullYear()} ás ${hours}:${minutes}`;

                await db.run('INSERT INTO posts(title, content, author_name, author_photo, created_at, lang) VALUES(?, ?, ?, ?, ?, ?)', [title, content, infos.displayName, infos.picture, create, lang]);

                const id_post = await db.all('SELECT id FROM posts WHERE author_name = ? AND created_at = ?', [infos.displayName, create]);
                res.redirect(`/post/${id_post[0].id}`);
            } else {
                console.log('burlou as langs');
                return res.send(`Olá ${infos.displayName}, por favor não tente burlar as linguagens, caso tenha um pedido para fazer entre em contato os desenvolvedor <br>
<a href="/">Home</a> <br>
<a href="/posts/novo-post">Criar novo post</a>`)
            }
        } else {
            return res.redirect('/posts/novo-post');
        }

        return res.send('Erro ao criar post')
    }
}