// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

const users = require('./users');

module.exports = app => {
  app.post('/login', users.login);
  app.post('/logout', users.logout);
  app.post('/register', users.register);
  app.post('/userInfo', users.userInfo);
};

