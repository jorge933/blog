module.exports = {
    async index(req, res) {
        const Topics_Model = require('../../models/topics');
        const topics = await Topics_Model.langs();
        
        res.render('admin/manage-topics', { css: 'manage-topic-admin', title: 'Tópicos', topics, isLogged: false, level: 3 });
    }
}