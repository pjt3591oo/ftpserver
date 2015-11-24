var secu = require('../model/secu');
var fs = require('fs');

function index(req, res) {
    var dir = __dirname;

    fs.readdir(dir, function (err, items) {
        if (!req.cookies.user) {
            res.render('index', { title: dir, item: items, logStatus: 'signin' });
        } else {
            res.render('index', { title: dir, item: items, logStatus: 'logout' });
        }
    });
}
exports.index = index;
;

function firstpre(req, res) {
    var a = req.body.pre;
    var path = req.body.PathDir;
    console.log(a);
    console.log(path);
    a = a.split('\\');

    var dir = "";
    var cou = ((a.length));

    for (var i = 0; i < cou - 1; i++) {
        dir += a[i];
        dir += '\\';
    }

    fs.readdir(dir, function (err, items) {
        if (!req.cookies.user) {
            res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
        } else {
            res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
        }
    });
}
exports.firstpre = firstpre;
;

function pre(req, res) {
    var a = req.body.pre;
    console.log(a);
    a = a.split('\\');

    var dir = "";
    var cou = ((a.length));

    if (cou > 2) {
        for (var i = 0; i < cou - 2; i++) {
            dir += a[i];
            dir += '\\';
        }

        fs.readdir(dir, function (err, items) {
            if (!req.cookies.user) {
                res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
            } else {
                res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
            }
        });
    } else {
        for (var i = 0; i < cou - 1; i++) {
            dir += a[i];
            dir += '\\';
        }

        fs.readdir(dir, function (err, items) {
            if (!req.cookies.user) {
                res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
            } else {
                res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
            }
        });
    }
}
exports.pre = pre;
;

function download(req, res) {
    var down = req.body.path;
    var file = req.param('file');

    res.download(down);
}
exports.download = download;
;

function crime(req, res) {
    var path = req.body.path;

    console.log(path);

    fs.readdir(path, function (err, items) {
        if (!req.cookies.user) {
            res.render('indexpre', { title: path, item: items, logStatus: 'signin' });
        } else {
            res.render('indexpre', { title: path, item: items, logStatus: 'logout' });
        }
    });
}
exports.crime = crime;
;

function create(req, res) {
    var path = req.body.dircreate;
    var dir = req.body.dir;

    fs.mkdir(path + '\\' + dir, function (err, items) {
        res.redirect('/');
    });
}
exports.create = create;
;
function upload(req, res) {
    var path = req.body.path;
    var file = req.file.filename;
    var oriname = req.file.originalname;

    //console.log(path);
    fs.renameSync(req.file.path, path + '\\' + oriname);
    res.redirect('/');
}
exports.upload = upload;
;
//# sourceMappingURL=index.js.map
