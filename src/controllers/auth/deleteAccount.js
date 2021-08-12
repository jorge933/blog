module.exports = {
    async index(req, res) {
        const deleteAccount_model = require('../../models/user/deleteAccount');
        await deleteAccount_model(req.user.email);
        
        req.logout();
        req.session.destroy();
        return res.send('Conta excluida!! <br> <a href="/">Home</a>');
    }
}