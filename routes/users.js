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
router.post('/login', function(req,res,next){
  users.findOne({UserID: req.body.users_id_login},function(err,doc){
    if(doc){
      if(doc.UserPW==req.body.users_pw_login){
        res.cookie('userid',doc._id,{ expires: new Date(Date.now() + 90000000), httpOnly: true ,signed:true})
        if(req.body.auto_login=='on'){
          res.cookie('userprofile',doc._id,{ expires: new Date(Date.now() + 90000000), httpOnly: true ,signed:true})
        }
        if(doc.UserPermission='admin'){
          res.render('DataPage');
        }
        res.render('index');
      }else{
        res.send('<script>alert("비밀번호가 일치하지 않습니다");location.assign("/");</script>');
      }
    }else{
      res.send('<script>alert("존재하지 않는 회원입니다");location.assign("/");</script>');
    }
  });
});
router.post('/getUserStatus', function(req,res){
  var userID = req.signedCookies.userid;
  users.findOne({_id: userID},function(err,doc){
    if(!doc){
      res.json(null);
    }
    res.json(doc);
  })
});
router.post('/logout', function(req,res){
  res.cookie('user',null,{ expires: new Date(Date.now() + 90000000), httpOnly: true ,signed:true})
});
router.post('/signUp',function(req,res,next){
  var tempUser= new users;
  tempUser.UserID= req.body.users_id;
  tempUser.UserPW= req.body.users_pw;
  tempUser.UserPermission= 'normal';
  if(req.body.users_pw!=req.body.users_pw_check){
    res.send('<script>alert("비밀번호가 일치하지 않습니다");location.assign("/");</script>');
  }
  users.findOne({UserID: req.body.users_id},function(err,doc){
    if(!doc){
      tempUser.save();
      res.send('<script>alert("성공적으로 가입되었습니다");location.assign("/");</script>');
    }else{
      res.send('<script>alert("이미 존재하는 사용자입니다");location.assign("/");</script>');
    }
  })
});

module.exports = router;
