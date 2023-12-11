// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;

const User = require('../models/user');
import { responseClient, md5 } from '../util/util.js';

exports.login = (req, res) => {
  const { phone, password } = req.body;
  const reg =/^1[34578]\d{9}$/
  if (!phone) {
    responseClient(res, 200, 400, 'Email cannot be empty');
    return;
  }else if(!reg.test(phone)){
    responseClient(res, 200, 400, 'Please enter your mobile number in the correct format');
    return;
  }
  if (!password) {
    responseClient(res, 200, 400, 'Password cannot be empty');
    return;
  }
  User.findOne({
    phone,
    password: md5(password),
  })
      .then(userInfo => {
        console.log(userInfo._id)
        if (userInfo) {
          //login success return session
          req.session.userInfo = userInfo;
          responseClient(res, 200, 200, 'Login successful', null);
        } else {
          responseClient(res, 200, 402, 'Username or password is incorrect');
        }
      })
      .catch(err => {
        responseClient(res);
      });
};

//validate user info
exports.userInfo = (req, res) => {
  if (req.session.userInfo) {
    responseClient(res, 200, 200, '', req.session.userInfo);
  } else {
    responseClient(res, 200, 403, 'Please login again', req.session.userInfo);
  }
};

exports.logout = (req, res) => {
  console.log(req.session)
  if (req.session.userInfo) {
    req.session.userInfo = null;
    responseClient(res, 200, 200, 'Logout successful');
  } else {
    responseClient(res, 200, 402, 'You must be logged to logout');
  }
};

exports.register = (req, res) => {
  const { name, password, phone, type,email } = req.body;
  const regPhone =/^[0-9]{10}$/;
  const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!phone) {
    responseClient(res, 200, 400, 'Phone number cannot be empty');
    return;
  }else if(!regPhone.test(phone)){
    responseClient(res, 200, 400, 'Please enter the phone number in the correct format');
    return;
  }
  if (!name) {
    responseClient(res, 200, 400, 'Username cannot be empty');
    return;
  }
  if (!email) {
    responseClient(res, 200, 400, 'User email cannot be empty');
    return;
  }else if(!regEmail.test(email)){
    responseClient(res, 200, 400, 'Please enter a valid email address');
    return;
  }
  if (!password) {
    responseClient(res, 200, 400, 'User password cannot be empty');
    return;
  }
  //valid user in db
  User.findOne({ phone })
      .then(data => {
        if (data) {
          responseClient(res, 200, 402, 'The phone number already exists');
          return;
        }
        //save user
        let user = new User({
          name,
          password: md5(password),
          phone,
          type,
          email
        });
        user.save().then(data => {
          responseClient(res, 200, 200, 'Registration success', data);
        });
      })
      .catch(err => {
        responseClient(res);
        return;
      });
};

exports.delUser = (req, res) => {
  let { id } = req.body;
  User.deleteMany({ _id: id })
      .then(result => {
        if (result.n === 1) {
          responseClient(res, 200, 0, 'User deleted successfully');
        } else {
          responseClient(res, 200, 1, 'User does not exist');
        }
      })
      .catch(err => {
        responseClient(res);
      });
};
