/**
 * Created by Astora on 2015-11-04.
 */
var express = require('express');
var router = express.Router();
module.exports = router;
var mongoose = require('mongoose');
var db = mongoose.connection;
var models;
var multer = require('multer')
var fs = require('fs');
var upload = multer({dest: 'uploads/'});
var earphone;
var headphone;

router.post('/uploadModel', upload.array('Image', 5), function (req, res, next) {
    var tempModelType = req.body.ModelType;
    var countSign;
    if (req.body.ModelType == '이어폰') {
        earphone.count({}, function (err, count) {
            countSign = count;
            var tempModelID = 'EarPhone' + (countSign + 1);
            var tempModel = new models({
                modelID: tempModelID,
                modelType: tempModelType
            });
            var tempEarPhone = new earphone();
            tempEarPhone.modelID = tempModelID;
            tempEarPhone.ModelName = req.body.modelName;
            tempEarPhone.Brand = req.body.brand;
            tempEarPhone.Pay = req.body.pay;
            tempEarPhone.Unit = req.body.Unit;
            tempEarPhone.Design = req.body.design;
            tempEarPhone.Remocon = req.body.Remocon;
            tempEarPhone.osSupport = req.body.osSupport;
            if (typeof(req.body.color) == 'object') {
                for (var tempColor in req.body.color) {
                    tempEarPhone.Color.push(req.body.color[tempColor]);
                }
            } else {
                tempEarPhone.Color.push(req.body.color);
            }
            if (typeof(req.body.functionality) == 'object') {
                for (var tempFunc in req.body.functionality) {
                    tempEarPhone.Functionality.push(req.body.functionality[tempFunc]);
                }
            }
            else {
                tempEarPhone.Functionality.push(req.body.functionality);
            }
            tempEarPhone.Row = req.body.row;
            tempEarPhone.High = req.body.high;
            tempEarPhone.Space = req.body.space;
            tempEarPhone.Wear = req.body.wear;
            if (typeof(req.body.genre) == 'object') {
                for (var tempGenre in req.body.genre) {
                    tempEarPhone.Genre.push(req.body.genre[tempGenre]);
                }
            }
            else {
                tempEarPhone.Genre.push(req.body.genre);
            }
            tempEarPhone.Plug = req.body.plug;
            if (typeof(req.body.sets) == 'object') {
                for (var tempSets in req.body.sets) {
                    tempEarPhone.Sets.push(req.body.sets[tempSets]);
                }
            }
            else {
                tempEarPhone.Sets.push(req.body.sets);
            }
            tempEarPhone.Url = req.body.url;
            tempEarPhone.Memos = req.body.memo;
            for (var ImageCount in req.files) {
                var data = fs.readFileSync(req.files[ImageCount].path);
                var filePath = __dirname.replace("\\routes", "\\public\\DBImages\\" + req.body.modelName + '-' + (ImageCount) + ".png");
                if (req.files[ImageCount].mimetype == 'image/jpeg') {
                    filePath = filePath.replace('.png', '.jpg');
                }
                console.log(filePath);
                fs.writeFileSync(filePath, data);
                var filePath = "/DBImages/" + req.body.modelName + '-' + (ImageCount) + ".png";
                if (req.files[ImageCount].mimetype == 'image/jpeg') {
                    filePath = filePath.replace('.png', '.jpg');
                }
                tempEarPhone.Image.push(filePath);
            }
            console.log(tempEarPhone);
            tempEarPhone.save();
            tempModel.save();
        });
    } else {
        headphone.count({}, function (err, count) {
            countSign=count;
            var tempModelID = 'HeadPhone' + (countSign + 1);
            tempModelID.replace('[object Object]', '');
            var tempModel = new models({
                modelID: tempModelID,
                modelType: tempModelType
            });
            var tempHeadPhone = new headphone();
            tempHeadPhone.modelID = tempModelID;
            tempHeadPhone.ModelName = req.body.modelName;
            tempHeadPhone.Brand = req.body.brand;
            tempHeadPhone.Pay = req.body.pay;
            tempHeadPhone.Unit = req.body.Unit;
            tempHeadPhone.Design = req.body.design;
            tempHeadPhone.Remocon = req.body.Remocon;
            tempHeadPhone.osSupport = req.body.osSupport;
            if (typeof(req.body.color) == 'object') {
                for (var tempColor in req.body.color) {
                    tempHeadPhone.Color.push(req.body.color[tempColor]);
                }
            } else {
                tempHeadPhone.Color.push(req.body.color);
            }
            if (typeof(req.body.functionality) == 'object') {
                for (var tempFunc in req.body.functionality) {
                    tempHeadPhone.Functionality.push(req.body.functionality[tempFunc]);
                }
            } else {
                tempHeadPhone.Functionality.push(req.body.functionality);
            }
            tempHeadPhone.Row = req.body.row;
            tempHeadPhone.High = req.body.high;
            tempHeadPhone.Space = req.body.space;
            tempHeadPhone.Wear = req.body.wear;
            if (typeof(req.body.genre) == 'object') {
                for (var tempGenre in req.body.genre) {
                    tempHeadPhone.Genre.push(req.body.genre[tempGenre]);
                }
            } else {
                tempHeadPhone.Genre.push(req.body.genre);
            }
            tempHeadPhone.Plug = req.body.plug;
            if (typeof(req.body.sets) == 'object') {
                for (var tempSets in req.body.sets) {
                    tempHeadPhone.Sets.push(req.body.sets[tempSets]);
                }
            } else {
                tempHeadPhone.Sets.push(req.body.sets);
            }
            tempHeadPhone.Url = req.body.url;
            tempHeadPhone.Memos = req.body.memo;
            for (var ImageCount in req.files) {
                var data = fs.readFileSync(req.files[ImageCount].path);
                var filePath = __dirname.replace("\\routes", "\\public\\DBImages\\" + req.body.modelName + '-' + (ImageCount) + ".png");
                if (req.files[ImageCount].mimetype == 'image/jpeg') {
                    filePath = filePath.replace('.png', '.jpg');
                }
                console.log(filePath);
                fs.writeFileSync(filePath, data);
                var filePath = "/DBImages/" + req.body.modelName + '-' + (ImageCount) + ".png";
                if (req.files[ImageCount].mimetype == 'image/jpeg') {
                    filePath = filePath.replace('.png', '.jpg');
                }
                tempHeadPhone.Image.push(filePath);
            }
            tempHeadPhone.save();
            tempModel.save();
        });
    }
    res.redirect('/DataPage');
});

db.once('open', function () {
    var modelsSchema = mongoose.Schema({
        modelID: String,
        modelType: String
    });
    var earphoneSchema = mongoose.Schema({
        modelID: String,
        ModelName: String,
        Brand: String,
        Pay: String,
        Unit: String,
        Design: String,
        Remocon: String,
        osSupport: [],
        Color: [],
        Functionality: [],
        Row: String,
        High: String,
        Space: String,
        Wear: String,
        Sound: String,
        Genre: [],
        URL: String,
        Memos: String,
        Image: [],
        Plug: String,
        Sets: []
    });
    var headphoneSchema = mongoose.Schema({
        modelID: String,
        ModelName: String,
        Brand: String,
        Pay: String,
        Unit: String,
        Design: String,
        Remocon: String,
        osSupport: [],
        Color: [],
        Functionality: [],
        Sound: String,
        Row: String,
        High: String,
        Space: String,
        Wear: String,
        Genre: [],
        URL: String,
        Memos: String,
        Image: [],
        Plug: String,
        Sets: []
    });
    models = mongoose.model('Models', modelsSchema);
    earphone = mongoose.model('Earphones', earphoneSchema);
    headphone = mongoose.model('headphones', headphoneSchema);
});

router.get('/getModelAll', function (req, res, next) {
    var ArrModels = new Array();
    models.find({}, function (err, docs) {
        if (err) {
            res.render('DataPage');
        } else {
            for (var docsIndex in docs) {
                var countModel = docs.length;
                if (docs[docsIndex].modelType == "이어폰") {
                    earphone.findOne({modelID: docs[docsIndex].modelID}, function (err, docs) {
                        if (err) res.render('DataPage');
                        var obj = docs;
                        ArrModels.push(obj);
                        if (countModel == ArrModels.length)res.json(ArrModels);
                    });
                } else {
                    headphone.findOne({modelID: docs[docsIndex].modelID}, function (err, docs) {
                        if (err) res.render('DataPage');
                        var obj = docs;
                        ArrModels.push(obj);
                        if (countModel == ArrModels.length)res.json(ArrModels);
                    });
                }
            }
        }
    });
});

router.get('/search',function(req,res,next){
    var searchContent= new Array();
    earphone.find({},function(err,docs){
        if(err){
            res.render('searchFin');
        }
        else{
            for(var i in docs){
                console.log(docs[i]);
                if(req.param('designOpen')=='false'?docs[i].Design=="오픈형":false     ) continue;
                if(req.param('designKernel')=='false'?docs[i].Design=="커널형":false) continue;
                if(req.param('designHanger')=='false'?docs[i].Design=="행거형":false) continue;
                if(req.param('musicBallad')=='true'?docs[i].Genre.indexOf("발라드")==-1:false)continue;
                if(req.param('musicHiphop')=='true'?docs[i].Genre.indexOf("힙합")==-1:false)continue;
                if(req.param('musicElectronic')=='true'?docs[i].Genre.indexOf("일렉트로닉")==-1:false)continue;
                if(req.param('musicClassic')=='true'?docs[i].Genre.indexOf("클래식")==-1:false)continue;
                if(req.param('musicDance')=='true'?docs[i].Genre.indexOf("댄스")==-1:false)continue;
                if(req.param('musicRock')=='true'?docs[i].Genre.indexOf("락")==-1:false)continue;
                if(req.param('funcMic')=='true'?docs[i].Genre.Remocon=='O':false)continue;
                if(req.param('funcBlueTooth')=='true'?docs[i].Functionality.indexOf("블루투스")==-1:false)continue;
                if(req.param('funcWaterproof')=='true'?docs[i].Functionality.indexOf("방수")==-1:false)continue;
                if(req.param('funcNoise')=='true'?docs[i].Functionality.indexOf("소음방지")==-1:false)continue;
                if(req.param('funcCable')=='true'?docs[i].Functionality.indexOf("케이블분리")==-1:false)continue;
                searchContent.push(docs[i]);
            }
            console.log(searchContent);
            res.json(searchContent);
        }
    });
});