/*
 * GET home page.
 */
import express = require('express');
var secu = require('../model/secu');
var fs = require('fs');

export function index(req: express.Request, res: express.Response) {
    var dir = __dirname;

    fs.readdir(dir, function (err, items) {
        if (!req.cookies.user) { //로그아웃상태
            res.render('index', { title: dir, item: items, logStatus: 'signin' });
        } else {
            res.render('index', { title: dir, item: items, logStatus: 'logout' });
        }

    });

};

export function firstpre(req: express.Request, res: express.Response) { // 마지막 디렉토리를 지우고 보낸다.

    var a = req.body.pre;
    var path = req.body.PathDir;
    console.log(a);
    console.log(path);
    a = a.split('\\');

    var dir="";
    var cou = ((a.length));

    for (var i = 0; i < cou-1; i++) {
        dir += a[i];
        dir += '\\';
    }

    fs.readdir(dir, function (err, items) {
        if (!req.cookies.user) { //로그아웃상태
            res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
        } else {
            res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
        }

    });
};

export function pre(req: express.Request, res: express.Response) { // 마지막 디렉토리를 지우고 보낸다.
    
    var a = req.body.pre;
    console.log(a);
    a = a.split('\\');

    var dir="";
    var cou = ((a.length));
    
    if (cou > 2) {
        for (var i = 0; i < cou - 2; i++) {
            dir += a[i];
            dir += '\\';
        }
  
        fs.readdir(dir, function (err, items) {
            if (!req.cookies.user) { //로그아웃상태
                res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
            } else {
                res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
            }
        });
    }
    else { //제일 상위 디렉토리
        for (var i = 0; i < cou - 1; i++) {
            dir += a[i];
            dir += '\\';
        }

        fs.readdir(dir, function (err, items) {
            if (!req.cookies.user) { //로그아웃상태
                res.render('indexpre', { title: dir, item: items, logStatus: 'signin' });
            } else {
                res.render('indexpre', { title: dir, item: items, logStatus: 'logout' });
            }
        });

    }
};

export function download(req: express.Request, res: express.Response) {
    
    var down = req.body.path;
    var file = req.param('file');

    res.download(down);

};

export function crime(req: express.Request, res: express.Response) {
    var path = req.body.path;
    
    console.log(path);

    fs.readdir(path, function (err, items) {
  
        if (!req.cookies.user) { //로그아웃상태
            res.render('indexpre', { title: path, item: items, logStatus: 'signin' });
        } else {
            res.render('indexpre', { title: path, item: items, logStatus: 'logout' });
        }
    });
};

export function create(req: express.Request, res: express.Response) {
    var path = req.body.dircreate;
    var dir = req.body.dir;


    fs.mkdir(path+'\\'+dir, function (err, items) {
        res.redirect('/');
    });
};
export function upload(req: express.Request, res: express.Response) {
    var path = req.body.path;
    var file = req.file.filename;
    var oriname = req.file.originalname;
    //console.log(path);

    fs.renameSync(req.file.path, path +'\\'+ oriname);
    res.redirect('/');
    
};