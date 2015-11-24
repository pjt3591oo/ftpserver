
var mysql = require('mysql');
var secu = require('../model/secu');

var ftp = mysql.createConnection({
    user: 'root',
    password: 'qkrwjdxo1',
    database: 'test'
});

exports.authlogin = function (req, res, next) {
    
    if (!req.cookies.user) {
        res.redirect('signin');
    } else {
        next();
    }

}

exports.notNeedNew = function (req, res, next) {
    if (!req.cookies.user) {
        next();
    } else {
        res.redirect('/');
    }
}
exports.authAdmin = function (req, res, next) {
    
    var id = req.cookies.user;
    if (secu.sqlprotect(id)) {
        res.render('err');

    } else {
        ftp.query('SELECT auth FROM ftpuser WHERE id=?', [id], function (err, data) {
            
            if (data[0].auth) { //관리자인 경우
                next();
            } else {
                res.redirect('/');
            }
        });

    }
}