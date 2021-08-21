const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express.Router();
require('./controllers/auth/GoogleAuth');

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}}));
app.use(passport.initialize());
app.use(passport.session());

// get ==================================================================================================

const InitializeController = require('./controllers/GET/PagesController/InitializeController');
const NewUser = require('./controllers/auth/NewUser');
const PostsInitializeController = require('./controllers/GET/PostsInitializeController');
const SinglePostController = require('./controllers/GET/SinglePostController');
const PageNewPostController = require('./controllers/GET/PagesController/PageNewPostController');
const PostsFilter = require('./controllers/GET/PostsFilter');
const SearchController = require('./controllers/GET/SearchController')
const NeWriterController = require('./controllers/GET/PagesController/NeWriterController');
const DeleteAccount = require('./controllers/auth/deleteAccount');
<<<<<<< HEAD
const ProfilesController = require('./controllers/GET/Profile/ProfilesController');
const PostsUser = require('./controllers/GET/Profile/PostsUser');
=======
const ProfilesController = require('./controllers/GET/PagesController/ProfilesController')
>>>>>>> 4ebd161dfd6ad550b4a0173475c73c493d4daadc

app.get('/', InitializeController.index);

app.get('/a', NewUser.index);

app.get('/posts', PostsInitializeController.index);

app.get('/post/:id', SinglePostController.index);

app.get('/posts/lang/:lang', PostsFilter.index);

app.get('/posts/novo-post', PageNewPostController.index);

app.get('/search=', SearchController.index)

app.get('/ser-um-escritor', NeWriterController.index);

app.get('/user/:user', ProfilesController.index);

<<<<<<< HEAD
app.get('/user/:user/posts', PostsUser.index);
=======
app.get('/user/:user/posts', (req, res) => res.render('posts-user', {css: 'profile', title: `${req.params.user} Posts`, isLogged: false}))
>>>>>>> 4ebd161dfd6ad550b4a0173475c73c493d4daadc

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/');
});

app.get('/delete-account', DeleteAccount.index);


// post =================================================================================================

const CreatePostController = require('./controllers/POST/CreatePostController');
const WriterController = require('./controllers/POST/WriterController');
const EditPostController = require('./controllers/POST/EditPostController');

app.post('/create-post', CreatePostController.index);
app.post('/ser-um-escritor', WriterController.index);
app.post('/edit-post', EditPostController.index);

// auth =================================================================================================

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/a',
        failureRedirect: '/auth/google'
    })
);


// admin =================================================================================================

const NewAdminController = require('./controllers/admin/NewAdminController');
const NewTopicController = require('./controllers/admin/NewTopicController');
const LoadWritersController = require('./controllers/admin/LoadWritersController');

const AdminInitialize = require('./controllers/admin/AdminInitialize');
const NewPassController = require('./controllers/admin/NewPassController');
const ManageTopicsController = require('./controllers/admin/ManageTopicsController');

app.get('/admin', AdminInitialize.index);

app.get('/admin/gerenciar-topicos', ManageTopicsController.index);

app.get('/admin/novos-escritores', LoadWritersController.index);



app.post('/new-admin', NewAdminController.index);

app.post('/new-pass', NewPassController.index);

app.post('/new-topic', NewTopicController.index)

module.exports = app