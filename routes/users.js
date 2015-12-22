var express = require('express');
var router = express.Router();
module.exports = router;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoundPick');
var db = mongoose.connection;
var multer = require('multer')
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
/* GET users listing. */

var users;
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
});
db.once('open',function(){
  var userSchema = mongoose.Schema({
    UserID: String,
    UserPW: String,
    UserPermission: String
  });
  users = mongoose.model('Users',userSchema);
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp',function(req,res,next){
  var tempUser= new users;
  tempUser.UserID= req.body.users_id;
  tempUser.UserPW= req.body.users_pw;
  console.log(req.body.users_id);
  console.log(req.body.users_pw);
  console.log(req.body.users_pw_check);
  console.log(req.body);
  if(req.body.users_pw!=req.body.users_pw_check){
    res.send('<script>alert("비밀번호가 일치하지 않습니다");</script>');
    res.redirect('/');
  }
});

module.exports = router;
