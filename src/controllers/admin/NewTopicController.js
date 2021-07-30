const Database = require('../../config/config');

module.exports = {
    async index(req, res) {
        // if (!req.user || !req.user.admin) return res.redirect('/');
        
        const Topics_Model = require('../../models/topics');
        const NewTopic = req.body.topic;
        const ExistTopic = await Topics_Model.searchLang(NewTopic);

        if (ExistTopic === false) {
            const db = await Database();

            await db.run('INSERT INTO langs(lang) VALUES(?)', [NewTopic]);
            await db.close();

            return res.redirect('/posts');
        } else return res.send('Este tópico ja existe <br> <a href="/admin/manage-topic">Voltar</a>')
    }
}