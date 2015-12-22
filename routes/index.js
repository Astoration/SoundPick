var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer =require('multer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/search',function(req,res,next){
    res.render('searchFin');
});
router.get('/DataPage',function(req,res,next){
   res.render('DataPage');
});

module.exports = router;
