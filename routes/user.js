var mysql = require('mysql');
var crypto = require('crypto');
var secu = require('../model/secu');

var ftp = mysql.createConnection({
    user: 'root',
    password: 'qkrwjdxo1',
    database: 'test'
});

function usernew(req, res, next) {
    res.render("newuser", { title: "asd", id: "ID입력", pw: "", nu: "인증번호 입력", logStatus: 'signin' });
}
exports.usernew = usernew;
;

function signin(req, res) {
    res.render("login", { title: "asd", err: "" });
}
exports.signin = signin;
;

function usernewtry(req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;
    var nu = req.body.authnum;

    if (secu.sqlprotect(id) || secu.sqlprotect(nu)) {
        res.render('err');
    } else {
        var s = crypto.createHash('sha1');
        s.update(pw);
        pw = s.digest('hex');

        if (nu != 123) {
            res.render("newuser", { title: "asd", id: id, pw: pw, nu: nu, err: "인증번호가 일치하지 않습니다." });
        } else if (pw.length < 3) {
            res.render("newuser", { title: "asd", id: id, pw: pw, nu: nu, err: "비밀번호가 짧습니다." });
        } else
            ;

        ftp.query('SELECT id FROM ftpuser WHERE id=?', [id], function (err, data) {
            if (data.length > 0) {
                res.render("newuser", { title: "asd", id: id, pw: pw, nu: nu, err: "이미 아이디가 존재합니다." });
            } else {
                ftp.query('INSERT INTO ftpuser(id,pw,auth) VALUES(?,?,0)', [id, pw], function () {
                    //로그기록남기기
                    res.redirect('/signin');
                });
            }
        });
    }
}
exports.usernewtry = usernewtry;
;

function signintry(req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;

    var s = crypto.createHash('sha1');
    s.update(pw);
    pw = s.digest('hex');
    if (secu.sqlprotect(id)) {
        res.render('err');
    } else {
        ftp.query('SELECT id, pw FROM ftpuser WHERE id=? AND pw=?', [id, pw], function (err, data) {
            console.log(data);
            if (data.length) {
                res.cookie('user', id);
                res.redirect('/');
            } else {
                res.render("login", { title: "asd", err: "회원정보가 일치하지 않습니다." });
            }
        });
    }
}
exports.signintry = signintry;
;

function logout(req, res, next) {
    res.clearCookie('user');
    res.redirect('/');
}
exports.logout = logout;
;
//# sourceMappingURL=user.js.map
