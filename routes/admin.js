

var mysql = require('mysql');
var fs = require('fs');
var secu = require('../model/secu');
var rmdir = require('rmdir');

var ftp = mysql.createConnection({
    user: 'root',
    password: 'qkrwjdxo1',
    database: 'test'
});

exports.userlist = function (req, res, next) { //유저 리스트
    ftp.query('SELECT * FROM ftpuser', function (err, data){
        console.log(data);
        res.render('userlist', { user:data, logStatus: 'logout'});
    })
}

exports.usersearchid = function (req, res, next) { //파일삭제
    var id = req.body.searchid;
    
    ftp.query('SELECT * FROM ftpuser WHERE id=?',[id], function (err, data) {
        console.log(data);
        res.render('userlist', { user: data, logStatus: 'logout' });
    })
}

exports.usersearchlv = function (req, res, next) { //파일삭제
    var lv = req.body.searchlv;
    
    ftp.query('SELECT * FROM ftpuser WHERE auth=?', [lv], function (err, data) {
        console.log(data);
        res.render('userlist', { user: data, logStatus: 'logout' });
    })
}

exports.userdel = function (req, res, next) { //유저삭제
    var id = req.param('deluser');

    ftp.query('DELETE FROM ftpuser WHERE id=?', [id], function () {
        res.redirect('/admin/users/list');
    });
}

exports.userlevelup = function (req, res, next) { //유저 권한상승
    var id = req.param('levelupuser');
    ftp.query('UPDATE ftpuser SET auth=1 WHERE id=?', [id], function () {
        res.redirect('/admin/users/list');
    });
}

exports.userleveldown = function (req, res, next) { //유저 권한하락
    var id = req.param('leveldownuser');
    ftp.query('UPDATE ftpuser SET auth=0 WHERE id=?', [id], function () {
        res.redirect('/admin/users/list');
    });
}

exports.filedelete = function (req, res, next) { //파일삭제
    var file = req.param('delfile');
    var path = req.body.path;
    
    path = path + '\\' + file;
    console.log(path);
    
    var co = file.split('.').length;
    
    console.log(co);

    if (co==1) {//디렉토리 삭제 
        rmdir(path, function (err) { 
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else res.redirect('/');
        });
    } else { // 파일 삭제
        fs.unlink(path, function (err) {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else res.redirect('/');
        });
    }
}
