module.exports = {
    async index(req, res) {
        if (req.user) {
            const user_model = require('../../../models/UserInitialize');
            const user = await user_model(req.user.displayName);
            user[0].writer === 'true' ? req.user.writer = true : req.user.writer = false;
            user[0].admin === 'true' ? req.user.admin = true : req.user.admin = false;
            if (user[0].admin === 'true' && !user[0].password) {req.user.password = true} else {req.user.password = false}
            if (user[0].admin === 'true') {req.user.level = user[0].admin_level} else {req.user.level = 0}

            res.render('index', { css: 'index', title: 'Home', isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: req.user.writer, admin: req.user.admin, level: req.user.level});
        } else {
            res.render('index', { css: 'index', title: 'Home', isLogged: false });
        }
    }
}